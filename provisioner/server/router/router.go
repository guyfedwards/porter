package router

import (
	"github.com/go-chi/chi"
	"github.com/porter-dev/porter/api/server/router/middleware"
	"github.com/porter-dev/porter/provisioner/server/authz"
	"github.com/porter-dev/porter/provisioner/server/config"
	"github.com/porter-dev/porter/provisioner/server/handlers/provision"
	"github.com/porter-dev/porter/provisioner/server/handlers/state"
)

func NewAPIRouter(config *config.Config) *chi.Mux {
	r := chi.NewRouter()

	r.Route("/api/v1", func(r chi.Router) {
		// set the content type for all API endpoints and log all request info
		r.Use(middleware.ContentTypeJSON)

		// create new group for raw state endpoints which use workspace authz middleware
		workspaceAuth := authz.NewWorkspaceScopedFactory(config)

		r.Group(func(r chi.Router) {
			r.Use(workspaceAuth.Middleware)

			r.Method("GET", "/{workspace_id}/tfstate", state.NewRawStateGetHandler(config))
			r.Method("POST", "/{workspace_id}/tfstate", state.NewRawStateUpdateHandler(config))

			r.Method("GET", "/{workspace_id}/logs", state.NewLogsGetHandler(config))
			r.Method("GET", "/{workspace_id}/state", state.NewStateGetHandler(config))
		})

		// use project and infra-scoped middleware
		projectAuth := authz.NewProjectScopedFactory(config)
		infraAuth := authz.NewInfraScopedFactory(config)

		r.Group(func(r chi.Router) {
			r.Use(projectAuth.Middleware)
			r.Use(infraAuth.Middleware)

			r.Method("POST", "/projects/{project_id}/infras/{infra_id}/apply", provision.NewProvisionCreateHandler(config))
		})
	})

	return r
}
