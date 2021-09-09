package router_test

import (
	"net/http"
	"strings"
	"testing"

	"github.com/go-chi/chi"
	"github.com/porter-dev/porter/api/server/router"
	"github.com/porter-dev/porter/api/server/shared/apitest"
)

func TestRouter(t *testing.T) {
	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		route = strings.Replace(route, "/*/", "/", -1)
		t.Errorf("%s %s %d\n", method, route, len(middlewares))
		return nil
	}

	config := apitest.LoadConfig(t)
	r := router.NewAPIRouter(config)

	if err := chi.Walk(r, walkFunc); err != nil {
		t.Fatalf("Logging err: %s\n", err.Error())
	}
}