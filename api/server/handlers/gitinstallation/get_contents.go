package gitinstallation

import (
	"context"
	"net/http"

	"github.com/google/go-github/github"
	"github.com/porter-dev/porter/api/server/authz"
	"github.com/porter-dev/porter/api/server/handlers"
	"github.com/porter-dev/porter/api/server/shared"
	"github.com/porter-dev/porter/api/server/shared/apierrors"
	"github.com/porter-dev/porter/api/server/shared/config"
	"github.com/porter-dev/porter/api/server/shared/requestutils"
	"github.com/porter-dev/porter/api/types"
)

type GithubGetContentsHandler struct {
	handlers.PorterHandlerReadWriter
	authz.KubernetesAgentGetter
}

func NewGithubGetContentsHandler(
	config *config.Config,
	decoderValidator shared.RequestDecoderValidator,
	writer shared.ResultWriter,
) *GithubGetContentsHandler {
	return &GithubGetContentsHandler{
		PorterHandlerReadWriter: handlers.NewDefaultPorterHandler(config, decoderValidator, writer),
	}
}

func (c *GithubGetContentsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	request := &types.GetContentsRequest{}

	ok := c.DecodeAndValidate(w, r, request)

	if !ok {
		return
	}

	owner, name, ok := GetOwnerAndNameParams(c, w, r)

	if !ok {
		return
	}

	branch, reqErr := requestutils.GetURLParamString(r, types.URLParamGitBranch)

	if reqErr != nil {
		c.HandleAPIError(w, r, reqErr)
		return
	}

	client, err := GetGithubAppClientFromRequest(c.Config(), r)

	if err != nil {
		c.HandleAPIError(w, r, apierrors.NewErrInternal(err))
		return
	}

	repoContentOptions := github.RepositoryContentGetOptions{}
	repoContentOptions.Ref = branch
	_, directoryContents, _, err := client.Repositories.GetContents(
		context.Background(),
		owner,
		name,
		request.Dir,
		&repoContentOptions,
	)

	if err != nil {
		c.HandleAPIError(w, r, apierrors.NewErrInternal(err))
		return
	}

	res := make(types.GetContentsResponse, 0)

	for i := range directoryContents {
		res = append(res, types.GithubDirectoryItem{
			Path: *directoryContents[i].Path,
			Type: *directoryContents[i].Type,
		})
	}

	c.WriteResult(w, r, res)
}