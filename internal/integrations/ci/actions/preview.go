package actions

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/google/go-github/v41/github"

	"gopkg.in/yaml.v2"
)

type EnvOpts struct {
	Client                                  *github.Client
	ServerURL                               string
	PorterToken                             string
	GitRepoOwner, GitRepoName               string
	EnvironmentName                         string
	ProjectID, ClusterID, GitInstallationID uint
}

func SetupEnv(opts *EnvOpts) error {
	// create Github environment if it does not exist
	_, resp, err := opts.Client.Repositories.GetEnvironment(
		context.Background(),
		opts.GitRepoOwner,
		opts.GitRepoName,
		opts.EnvironmentName,
	)

	if resp.StatusCode == http.StatusNotFound {
		_, _, err := opts.Client.Repositories.CreateUpdateEnvironment(
			context.Background(),
			opts.GitRepoOwner,
			opts.GitRepoName,
			opts.EnvironmentName,
			nil,
		)

		if err != nil {
			return err
		}
	} else if err != nil {
		return err
	}

	// create porter token secret
	err = createGithubSecret(
		opts.Client,
		getPorterTokenSecretName(opts.ProjectID),
		opts.PorterToken,
		opts.GitRepoOwner,
		opts.GitRepoName,
	)

	if err != nil {
		return err
	}

	// get the repository to find the default branch
	repo, _, err := opts.Client.Repositories.Get(
		context.TODO(),
		opts.GitRepoOwner,
		opts.GitRepoName,
	)

	if err != nil {
		return err
	}

	defaultBranch := repo.GetDefaultBranch()

	applyWorkflowYAML, err := getPreviewApplyActionYAML(opts)

	if err != nil {
		return err
	}

	_, err = commitGithubFile(
		opts.Client,
		fmt.Sprintf("porter_%s_env.yml", strings.ToLower(opts.EnvironmentName)),
		applyWorkflowYAML,
		opts.GitRepoOwner,
		opts.GitRepoName,
		defaultBranch,
		false,
	)

	if err != nil {
		return err
	}

	deleteWorkflowYAML, err := getPreviewDeleteActionYAML(opts)

	if err != nil {
		return err
	}

	_, err = commitGithubFile(
		opts.Client,
		fmt.Sprintf("porter_%s_delete_env.yml", strings.ToLower(opts.EnvironmentName)),
		deleteWorkflowYAML,
		opts.GitRepoOwner,
		opts.GitRepoName,
		defaultBranch,
		false,
	)

	if err != nil {
		return err
	}

	return err
}

func DeleteEnv(opts *EnvOpts) error {
	// get the repository to find the default branch
	repo, _, err := opts.Client.Repositories.Get(
		context.TODO(),
		opts.GitRepoOwner,
		opts.GitRepoName,
	)

	if err != nil {
		return err
	}

	defaultBranch := repo.GetDefaultBranch()

	// delete GitHub Environment

	_, err = opts.Client.Repositories.DeleteEnvironment(
		context.Background(),
		opts.GitRepoOwner,
		opts.GitRepoName,
		opts.EnvironmentName,
	)

	if err != nil {
		return err
	}

	err = deleteGithubFile(
		opts.Client,
		fmt.Sprintf("porter_%s_env.yml", strings.ToLower(opts.EnvironmentName)),
		opts.GitRepoOwner,
		opts.GitRepoName,
		defaultBranch,
		false,
	)

	if err != nil {
		return err
	}

	return deleteGithubFile(
		opts.Client,
		fmt.Sprintf("porter_%s_delete_env.yml", strings.ToLower(opts.EnvironmentName)),
		opts.GitRepoOwner,
		opts.GitRepoName,
		defaultBranch,
		false,
	)
}

func getPreviewApplyActionYAML(opts *EnvOpts) ([]byte, error) {
	gaSteps := []GithubActionYAMLStep{
		getCheckoutCodeStep(),
		getCreatePreviewEnvStep(
			opts.ServerURL,
			getPorterTokenSecretName(opts.ProjectID),
			opts.ProjectID,
			opts.ClusterID,
			opts.GitInstallationID,
			opts.GitRepoName,
			// TODO: change to actual release version
			"master",
		),
	}

	actionYAML := GithubActionYAML{
		On:   []string{"pull_request"},
		Name: "Porter Preview Environment",
		Jobs: map[string]GithubActionYAMLJob{
			"porter-preview": {
				RunsOn: "ubuntu-latest",
				Steps:  gaSteps,
			},
		},
	}

	return yaml.Marshal(actionYAML)
}

func getPreviewDeleteActionYAML(opts *EnvOpts) ([]byte, error) {
	gaSteps := []GithubActionYAMLStep{
		getDeletePreviewEnvStep(
			opts.ServerURL,
			getPorterTokenSecretName(opts.ProjectID),
			opts.ProjectID,
			opts.ClusterID,
			opts.GitInstallationID,
			opts.GitRepoName,
			// TODO: change to actual release version
			"master",
		),
	}

	actionYAML := GithubActionYAML{
		On: map[string]interface{}{
			"pull_request": map[string]interface{}{
				"types": []string{"closed"},
			},
		},
		Name: "Porter Preview Environment",
		Jobs: map[string]GithubActionYAMLJob{
			"porter-delete-preview": {
				RunsOn: "ubuntu-latest",
				Steps:  gaSteps,
			},
		},
	}

	return yaml.Marshal(actionYAML)
}