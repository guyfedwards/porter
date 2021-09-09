package types

type CreateECRInfraRequest struct {
	ECRName          string `json:"ecr_name" form:"required"`
	ProjectID        uint   `json:"project_id" form:"required"`
	AWSIntegrationID uint   `json:"aws_integration_id" form:"required"`
}

type CreateEKSInfraRequest struct {
	EKSName          string `json:"eks_name" form:"required"`
	MachineType      string `json:"machine_type"`
	ProjectID        uint   `json:"project_id" form:"required"`
	AWSIntegrationID uint   `json:"aws_integration_id" form:"required"`
}

type CreateGCRInfraRequest struct {
	ProjectID        uint `json:"project_id" form:"required"`
	GCPIntegrationID uint `json:"gcp_integration_id" form:"required"`
}

type CreateGKEInfraRequest struct {
	GKEName          string `json:"gke_name" form:"required"`
	ProjectID        uint   `json:"project_id" form:"required"`
	GCPIntegrationID uint   `json:"gcp_integration_id" form:"required"`
}

type CreateDOCRInfraRequest struct {
	DOCRName             string `json:"docr_name" form:"required"`
	DOCRSubscriptionTier string `json:"docr_subscription_tier" form:"required"`
	ProjectID            uint   `json:"project_id" form:"required"`
	DOIntegrationID      uint   `json:"do_integration_id" form:"required"`
}

type CreateDOKSInfraRequest struct {
	DORegion        string `json:"do_region" form:"required"`
	DOKSName        string `json:"doks_name" form:"required"`
	ProjectID       uint   `json:"project_id" form:"required"`
	DOIntegrationID uint   `json:"do_integration_id" form:"required"`
}

type DeleteInfraRequest struct {
	Name string `json:"name" form:"required"`
}