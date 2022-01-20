package redis_stream

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"regexp"
	"strings"

	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/porter-dev/porter/internal/analytics"
	"github.com/porter-dev/porter/internal/kubernetes"
	"github.com/porter-dev/porter/internal/kubernetes/envgroup"
	"gorm.io/gorm"

	redis "github.com/go-redis/redis/v8"

	"github.com/porter-dev/porter/api/server/shared/config"
	"github.com/porter-dev/porter/api/types"
	"github.com/porter-dev/porter/internal/models"
	"github.com/porter-dev/porter/internal/repository"
)

// GlobalStreamName is the name of the Redis stream for global operations
const GlobalStreamName = "global"

// GlobalStreamGroupName is the name of the Redis consumer group that this server
// is a part of
const GlobalStreamGroupName = "portersvr"

// InitGlobalStream initializes the global stream if it does not exist, and the
// global consumer group if it does not exist
func InitGlobalStream(client *redis.Client) error {
	// determine if the stream exists
	x, err := client.Exists(
		context.Background(),
		GlobalStreamName,
	).Result()

	// if it does not exist, create group and stream
	if x == 0 {
		_, err := client.XGroupCreateMkStream(
			context.Background(),
			GlobalStreamName,
			GlobalStreamGroupName,
			">",
		).Result()

		return err
	}

	// otherwise, check if the group exists
	xInfoGroups, err := client.XInfoGroups(
		context.Background(),
		GlobalStreamName,
	).Result()

	// if error is not NOGROUP error, return
	if err != nil && !strings.Contains(err.Error(), "NOGROUP") {
		return err
	}

	for _, group := range xInfoGroups {
		// if the group exists, return with no error
		if group.Name == GlobalStreamGroupName {
			return nil
		}
	}

	// if the group does not exist, create it
	_, err = client.XGroupCreate(
		context.Background(),
		GlobalStreamName,
		GlobalStreamGroupName,
		"$",
	).Result()

	return err
}

// ResourceCRUDHandler is a handler for updates to an infra resource
type ResourceCRUDHandler interface {
	OnCreate(id uint) error
}

// GlobalStreamListener performs an XREADGROUP operation on a given stream and
// updates models in the database as necessary
func GlobalStreamListener(
	client *redis.Client,
	config *config.Config,
	repo repository.Repository,
	analyticsClient analytics.AnalyticsSegmentClient,
	errorChan chan error,
) {
	for {
		xstreams, err := client.XReadGroup(
			context.Background(),
			&redis.XReadGroupArgs{
				Group:    GlobalStreamGroupName,
				Consumer: "portersvr-0", // just static consumer for now
				Streams:  []string{GlobalStreamName, ">"},
				Block:    0,
			},
		).Result()

		if err != nil {
			errorChan <- err
			return
		}

		// parse messages from the global stream
		for _, msg := range xstreams[0].Messages {
			// parse the id to identify the infra
			kind, projID, infraID, err := models.ParseUniqueName(fmt.Sprintf("%v", msg.Values["id"]))

			if fmt.Sprintf("%v", msg.Values["status"]) == "created" {
				infra, err := repo.Infra().ReadInfra(projID, infraID)

				if err != nil {
					continue
				}

				infra.Status = types.StatusCreated

				infra, err = repo.Infra().UpdateInfra(infra)

				if err != nil {
					continue
				}

				// create ECR/EKS
				if kind == string(types.InfraECR) {
					reg := &models.Registry{
						ProjectID:        projID,
						AWSIntegrationID: infra.AWSIntegrationID,
						InfraID:          infra.ID,
					}

					// parse raw data into ECR type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						json.Unmarshal([]byte(dataString), reg)
					}

					awsInt, err := repo.AWSIntegration().ReadAWSIntegration(reg.ProjectID, reg.AWSIntegrationID)

					if err != nil {
						continue
					}

					sess, err := awsInt.GetSession()

					if err != nil {
						continue
					}

					ecrSvc := ecr.New(sess)

					output, err := ecrSvc.GetAuthorizationToken(&ecr.GetAuthorizationTokenInput{})

					if err != nil {
						continue
					}

					reg.URL = *output.AuthorizationData[0].ProxyEndpoint

					reg, err = repo.Registry().CreateRegistry(reg)

					if err != nil {
						continue
					}

					analyticsClient.Track(analytics.RegistryProvisioningSuccessTrack(
						&analytics.RegistryProvisioningSuccessTrackOpts{
							RegistryScopedTrackOpts: analytics.GetRegistryScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, reg.ID),
							RegistryType:            infra.Kind,
							InfraID:                 infra.ID,
						},
					))
				} else if kind == string(types.InfraRDS) {
					// parse the last applied field to get the cluster id
					rdsRequest := &types.RDSInfraLastApplied{}
					err := json.Unmarshal(infra.LastApplied, rdsRequest)

					if err != nil {
						continue
					}

					database := &models.Database{}

					// parse raw data into ECR type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						err = json.Unmarshal([]byte(dataString), database)

						if err != nil {
						}
					}

					database.Model = gorm.Model{}
					database.ProjectID = projID
					database.ClusterID = rdsRequest.ClusterID
					database.InfraID = infra.ID

					database, err = repo.Database().CreateDatabase(database)

					if err != nil {
						continue
					}

					infra.DatabaseID = database.ID
					infra, err = repo.Infra().UpdateInfra(infra)

					if err != nil {
						continue
					}

					err = createRDSEnvGroup(repo, config, infra, database, rdsRequest)

					if err != nil {
						continue
					}
				} else if kind == string(types.InfraEKS) {
					cluster := &models.Cluster{
						AuthMechanism:    models.AWS,
						ProjectID:        projID,
						AWSIntegrationID: infra.AWSIntegrationID,
						InfraID:          infra.ID,
					}

					// parse raw data into ECR type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						json.Unmarshal([]byte(dataString), cluster)
					}

					re := regexp.MustCompile(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`)

					// if it matches the base64 regex, decode it
					caData := string(cluster.CertificateAuthorityData)
					if re.MatchString(caData) {
						decoded, err := base64.StdEncoding.DecodeString(caData)

						if err != nil {
							continue
						}

						cluster.CertificateAuthorityData = []byte(decoded)
					}

					cluster, err := repo.Cluster().CreateCluster(cluster)

					if err != nil {
						continue
					}

					analyticsClient.Track(analytics.ClusterProvisioningSuccessTrack(
						&analytics.ClusterProvisioningSuccessTrackOpts{
							ClusterScopedTrackOpts: analytics.GetClusterScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, cluster.ID),
							ClusterType:            infra.Kind,
							InfraID:                infra.ID,
						},
					))
				} else if kind == string(types.InfraGCR) {
					reg := &models.Registry{
						ProjectID:        projID,
						GCPIntegrationID: infra.GCPIntegrationID,
						InfraID:          infra.ID,
						Name:             "gcr-registry",
					}

					// parse raw data into ECR type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						json.Unmarshal([]byte(dataString), reg)
					}

					reg, err = repo.Registry().CreateRegistry(reg)

					if err != nil {
						continue
					}

					analyticsClient.Track(analytics.RegistryProvisioningSuccessTrack(
						&analytics.RegistryProvisioningSuccessTrackOpts{
							RegistryScopedTrackOpts: analytics.GetRegistryScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, reg.ID),
							RegistryType:            infra.Kind,
							InfraID:                 infra.ID,
						},
					))
				} else if kind == string(types.InfraGKE) {
					cluster := &models.Cluster{
						AuthMechanism:    models.GCP,
						ProjectID:        projID,
						GCPIntegrationID: infra.GCPIntegrationID,
						InfraID:          infra.ID,
					}

					// parse raw data into GKE type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						json.Unmarshal([]byte(dataString), cluster)
					}

					re := regexp.MustCompile(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`)

					// if it matches the base64 regex, decode it
					caData := string(cluster.CertificateAuthorityData)
					if re.MatchString(caData) {
						decoded, err := base64.StdEncoding.DecodeString(caData)

						if err != nil {
							continue
						}

						cluster.CertificateAuthorityData = []byte(decoded)
					}

					cluster, err := repo.Cluster().CreateCluster(cluster)

					if err != nil {
						continue
					}

					analyticsClient.Track(analytics.ClusterProvisioningSuccessTrack(
						&analytics.ClusterProvisioningSuccessTrackOpts{
							ClusterScopedTrackOpts: analytics.GetClusterScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, cluster.ID),
							ClusterType:            infra.Kind,
							InfraID:                infra.ID,
						},
					))
				} else if kind == string(types.InfraDOCR) {
					reg := &models.Registry{
						ProjectID:       projID,
						DOIntegrationID: infra.DOIntegrationID,
						InfraID:         infra.ID,
					}

					// parse raw data into DOCR type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						json.Unmarshal([]byte(dataString), reg)
					}

					reg, err = repo.Registry().CreateRegistry(reg)

					if err != nil {
						continue
					}

					analyticsClient.Track(analytics.RegistryProvisioningSuccessTrack(
						&analytics.RegistryProvisioningSuccessTrackOpts{
							RegistryScopedTrackOpts: analytics.GetRegistryScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, reg.ID),
							RegistryType:            infra.Kind,
							InfraID:                 infra.ID,
						},
					))
				} else if kind == string(types.InfraDOKS) {
					cluster := &models.Cluster{
						AuthMechanism:   models.DO,
						ProjectID:       projID,
						DOIntegrationID: infra.DOIntegrationID,
						InfraID:         infra.ID,
					}

					// parse raw data into GKE type
					dataString, ok := msg.Values["data"].(string)

					if ok {
						json.Unmarshal([]byte(dataString), cluster)
					}

					re := regexp.MustCompile(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`)

					// if it matches the base64 regex, decode it
					caData := string(cluster.CertificateAuthorityData)
					if re.MatchString(caData) {
						decoded, err := base64.StdEncoding.DecodeString(caData)

						if err != nil {
							continue
						}

						cluster.CertificateAuthorityData = []byte(decoded)
					}

					cluster, err := repo.Cluster().CreateCluster(cluster)

					if err != nil {
						continue
					}

					analyticsClient.Track(analytics.ClusterProvisioningSuccessTrack(
						&analytics.ClusterProvisioningSuccessTrackOpts{
							ClusterScopedTrackOpts: analytics.GetClusterScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, cluster.ID),
							ClusterType:            infra.Kind,
							InfraID:                infra.ID,
						},
					))
				}
			} else if fmt.Sprintf("%v", msg.Values["status"]) == "error" {
				infra, err := repo.Infra().ReadInfra(projID, infraID)

				if err != nil {
					continue
				}

				infra.Status = types.StatusError

				infra, err = repo.Infra().UpdateInfra(infra)

				if err != nil {
					continue
				}

				if infra.Kind == types.InfraDOKS || infra.Kind == types.InfraGKE || infra.Kind == types.InfraEKS {
					analyticsClient.Track(analytics.ClusterProvisioningErrorTrack(
						&analytics.ClusterProvisioningErrorTrackOpts{
							ProjectScopedTrackOpts: analytics.GetProjectScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID),
							ClusterType:            infra.Kind,
							InfraID:                infra.ID,
						},
					))
				} else if infra.Kind == types.InfraDOCR || infra.Kind == types.InfraGCR || infra.Kind == types.InfraECR {
					analyticsClient.Track(analytics.RegistryProvisioningErrorTrack(
						&analytics.RegistryProvisioningErrorTrackOpts{
							ProjectScopedTrackOpts: analytics.GetProjectScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID),
							RegistryType:           infra.Kind,
							InfraID:                infra.ID,
						},
					))
				}
			} else if fmt.Sprintf("%v", msg.Values["status"]) == "destroyed" {
				infra, err := repo.Infra().ReadInfra(projID, infraID)

				if err != nil {
					continue
				}

				infra.Status = types.StatusDestroyed

				infra, err = repo.Infra().UpdateInfra(infra)

				if err != nil {
					continue
				}

				if infra.Kind == types.InfraDOKS || infra.Kind == types.InfraGKE || infra.Kind == types.InfraEKS {
					analyticsClient.Track(analytics.ClusterDestroyingSuccessTrack(
						&analytics.ClusterDestroyingSuccessTrackOpts{
							ClusterScopedTrackOpts: analytics.GetClusterScopedTrackOpts(infra.CreatedByUserID, infra.ProjectID, 0),
							ClusterType:            infra.Kind,
							InfraID:                infra.ID,
						},
					))
				} else if infra.Kind == types.InfraRDS && infra.DatabaseID != 0 {
					rdsRequest := &types.RDSInfraLastApplied{}
					err := json.Unmarshal(infra.LastApplied, rdsRequest)

					if err != nil {
						continue
					}

					database, err := repo.Database().ReadDatabase(infra.ProjectID, rdsRequest.ClusterID, infra.DatabaseID)

					if err != nil {
						continue
					}

					err = deleteRDSEnvGroup(repo, config, infra, database, rdsRequest)

					if err != nil {
						continue
					}

					// delete the database
					err = repo.Database().DeleteDatabase(infra.ProjectID, rdsRequest.ClusterID, infra.DatabaseID)

					if err != nil {
						continue
					}
				}
			}

			// acknowledge the message as read
			_, err = client.XAck(
				context.Background(),
				GlobalStreamName,
				GlobalStreamGroupName,
				msg.ID,
			).Result()

			// if error, continue for now
			if err != nil {
				continue
			}
		}
	}
}

func createRDSEnvGroup(repo repository.Repository, config *config.Config, infra *models.Infra, database *models.Database, rdsConfig *types.RDSInfraLastApplied) error {

	cluster, err := repo.Cluster().ReadCluster(infra.ProjectID, rdsConfig.ClusterID)

	if err != nil {
		return err
	}

	ooc := &kubernetes.OutOfClusterConfig{
		Repo:              config.Repo,
		DigitalOceanOAuth: config.DOConf,
		Cluster:           cluster,
	}

	agent, err := kubernetes.GetAgentOutOfClusterConfig(ooc)

	if err != nil {
		return fmt.Errorf("failed to get agent: %s", err.Error())
	}

	_, err = envgroup.CreateEnvGroup(agent, types.ConfigMapInput{
		Name:      fmt.Sprintf("rds-credentials-%s", rdsConfig.DBName),
		Namespace: rdsConfig.Namespace,
		Variables: map[string]string{},
		SecretVariables: map[string]string{
			"HOST":     database.InstanceEndpoint,
			"PASSWORD": rdsConfig.Password,
			"USERNAME": rdsConfig.Username,
		},
	})

	if err != nil {
		return fmt.Errorf("failed to create RDS env group: %s", err.Error())
	}

	return nil
}

func deleteRDSEnvGroup(repo repository.Repository, config *config.Config, infra *models.Infra, database *models.Database, rdsConfig *types.RDSInfraLastApplied) error {
	cluster, err := repo.Cluster().ReadCluster(infra.ProjectID, rdsConfig.ClusterID)

	if err != nil {
		return err
	}

	ooc := &kubernetes.OutOfClusterConfig{
		Repo:              config.Repo,
		DigitalOceanOAuth: config.DOConf,
		Cluster:           cluster,
	}

	agent, err := kubernetes.GetAgentOutOfClusterConfig(ooc)

	if err != nil {
		return fmt.Errorf("failed to get agent: %s", err.Error())
	}

	err = envgroup.DeleteEnvGroup(agent, fmt.Sprintf("rds-credentials-%s", rdsConfig.DBName), rdsConfig.Namespace)

	if err != nil {
		return fmt.Errorf("failed to create RDS env group: %s", err.Error())
	}

	return nil
}
