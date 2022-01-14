package types

import (
	"time"

	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/release"
	v1 "k8s.io/api/core/v1"
)

const (
	URLParamPodName     URLParam = "name"
	URLParamIngressName URLParam = "name"
)

// ReleaseListFilter is a struct that represents the various filter options used for
// retrieving the releases
type ReleaseListFilter struct {
	Namespace    string   `json:"namespace"`
	Limit        int      `json:"limit"`
	Skip         int      `json:"skip"`
	ByDate       bool     `json:"byDate"`
	StatusFilter []string `json:"statusFilter"`
}

// listStatesFromNames accepts the following list of names:
//
// "deployed", "uninstalled", "uninstalling", "pending-install", "pending-upgrade",
// "pending-rollback", "superseded", "failed"
//
// It returns an action.ListStates to be used in an action.List as filters for
// releases in a certain state.
func (h *ReleaseListFilter) listStatesFromNames() action.ListStates {
	var res action.ListStates = 0

	for _, name := range h.StatusFilter {
		res = res | res.FromName(name)
	}

	return res
}

// Apply sets the ReleaseListFilter options for an action.List
func (h *ReleaseListFilter) Apply(list *action.List) {
	if h.Namespace == "" {
		list.AllNamespaces = true
	}

	list.Limit = h.Limit
	list.Offset = h.Skip

	list.StateMask = h.listStatesFromNames()

	if h.ByDate {
		list.ByDate = true
	}
}

type ListReleasesRequest struct {
	*ReleaseListFilter
}

type ListReleasesResponse []*release.Release

type GetConfigMapRequest struct {
	Name string `schema:"name,required"`
}

type GetConfigMapResponse struct {
	*v1.ConfigMap
}

type ListConfigMapsResponse struct {
	*v1.ConfigMapList
}

type ConfigMapInput struct {
	Name            string
	Namespace       string
	Variables       map[string]string
	SecretVariables map[string]string
}

type CreateConfigMapRequest struct {
	Name            string            `json:"name,required"`
	Variables       map[string]string `json:"variables,required"`
	SecretVariables map[string]string `json:"secret_variables,required"`
}

type EnvGroup struct {
	CreatedAt    time.Time         `json:"created_at"`
	Version      uint              `json:"version"`
	Name         string            `json:"name"`
	Namespace    string            `json:"namespace"`
	Applications []string          `json:"applications"`
	Variables    map[string]string `json:"variables"`
}

type EnvGroupMeta struct {
	CreatedAt time.Time `json:"created_at"`
	Version   uint      `json:"version"`
	Name      string    `json:"name"`
	Namespace string    `json:"namespace"`
}

type GetEnvGroupRequest struct {
	Name    string `schema:"name,required"`
	Version uint   `schema:"version"`
}

type GetEnvGroupAllRequest struct {
	Name string `schema:"name,required"`
}

type DeleteEnvGroupRequest struct {
	Name string `json:"name,required"`
}

type AddEnvGroupApplicationRequest struct {
	Name            string `json:"name" form:"required"`
	ApplicationName string `json:"app_name" form:"required"`
}

type ListEnvGroupsResponse []*EnvGroupMeta

type CreateEnvGroupRequest struct {
	Name            string            `json:"name,required"`
	Variables       map[string]string `json:"variables,required"`
	SecretVariables map[string]string `json:"secret_variables,required"`
}

type CreateConfigMapResponse struct {
	*v1.ConfigMap
}

type UpdateConfigMapRequest struct {
	Name            string            `json:"name,required"`
	Variables       map[string]string `json:"variables,required"`
	SecretVariables map[string]string `json:"secret_variables,required"`
}

type UpdateConfigMapResponse struct {
	*v1.ConfigMap
}

type RenameConfigMapRequest struct {
	Name    string `json:"name,required"`
	NewName string `json:"new_name,required"`
}

type RenameConfigMapResponse struct {
	*v1.ConfigMap
}

type DeleteConfigMapRequest struct {
	Name string `schema:"name,required"`
}

type GetPodLogsRequest struct {
	Container string `schema:"container_name"`
	Previous  bool   `schema:"previous"`
}
