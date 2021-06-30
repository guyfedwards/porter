package apierrors

import (
	"encoding/json"
	"net/http"

	"github.com/porter-dev/porter/api/types"
	"github.com/porter-dev/porter/internal/logger"
)

type RequestError interface {
	Error() string
	ExternalError() string
	InternalError() string
	GetStatusCode() int
}

type ErrInternal struct {
	err error
}

func NewErrInternal(err error) RequestError {
	return &ErrInternal{err}
}

func (e *ErrInternal) Error() string {
	return e.err.Error()
}

func (e *ErrInternal) InternalError() string {
	return e.err.Error()
}

func (e *ErrInternal) ExternalError() string {
	return "An internal error occurred."
}

func (e *ErrInternal) GetStatusCode() int {
	return http.StatusInternalServerError
}

type ErrForbidden struct {
	err error
}

func NewErrForbidden(err error) RequestError {
	return &ErrForbidden{err}
}

func (e *ErrForbidden) Error() string {
	return e.err.Error()
}

func (e *ErrForbidden) InternalError() string {
	return e.err.Error()
}

func (e *ErrForbidden) ExternalError() string {
	return "Forbidden"
}

func (e *ErrForbidden) GetStatusCode() int {
	return http.StatusForbidden
}

// errors that should be passed directly, with no filter
type ErrPassThroughToClient struct {
	err        error
	statusCode int
}

func NewErrPassThroughToClient(err error, statusCode int) RequestError {
	return &ErrPassThroughToClient{err, statusCode}
}

func (e *ErrPassThroughToClient) Error() string {
	return e.err.Error()
}

func (e *ErrPassThroughToClient) InternalError() string {
	return e.err.Error()
}

func (e *ErrPassThroughToClient) ExternalError() string {
	return e.err.Error()
}

func (e *ErrPassThroughToClient) GetStatusCode() int {
	return e.statusCode
}

func HandleAPIError(
	w http.ResponseWriter,
	logger *logger.Logger,
	err RequestError,
) {
	extErrorStr := err.ExternalError()

	// log the internal error
	logger.Warn().
		Str("internal_error", err.InternalError()).
		Str("external_error", extErrorStr).
		Msg("")

	// send the external error
	resp := &types.ExternalError{
		Error: extErrorStr,
	}

	// write the status code
	w.WriteHeader(err.GetStatusCode())

	writerErr := json.NewEncoder(w).Encode(resp)

	if writerErr != nil {
		logger.Error().
			Err(writerErr).
			Msg("")
	}

	return
}