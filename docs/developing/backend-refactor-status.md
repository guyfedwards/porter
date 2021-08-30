| Path                                                                                                                        | Assigned To | Changed schema? | CLI Updated | Frontend Updated |
| --------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------- | ----------- | ---------------- |
| <li>- [x] `GET /api/auth/check`                                                                                             |             | yes             |             | yes              |
| <li>- [x] `GET /api/capabilities`                                                                                           |             |                 |             | yes              |
| <li>- [x] `GET /api/cli/login`                                                                                              |             |                 | yes         |                  |
| <li>- [x] `GET /api/cli/login/exchange`                                                                                     |             |                 | yes         |                  |
| <li>- [x] `GET /api/email/verify/finalize`                                                                                  |             |                 |             |                  |
| <li>- [x] `POST /api/email/verify/initiate`                                                                                 |             |                 |             | yes              |
| <li>- [ ] `GET /api/integrations/cluster`                                                                                   |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/github-app/access`                                                                         |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/github-app/authorize`                                                                      |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/github-app/install`                                                                        |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/github-app/oauth`                                                                          |             |                 |             |                  |
| <li>- [ ] `POST /api/integrations/github-app/webhook`                                                                       |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/helm`                                                                                      |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/registry`                                                                                  |             |                 |             |                  |
| <li>- [ ] `GET /api/integrations/repo`                                                                                      |             |                 |             |                  |
| <li>- [ ] `GET /api/livez`                                                                                                  |             |                 |             |                  |
| <li>- [x] `POST /api/login`                                                                                                 |             |                 |             | yes              |
| <li>- [x] `POST /api/logout`                                                                                                |             |                 |             | yes              |
| <li>- [ ] `GET /api/oauth/digitalocean/callback`                                                                            |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/github-app/callback`                                                                              |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/github/callback`                                                                                  |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/google/callback`                                                                                  |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/login/github`                                                                                     |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/login/google`                                                                                     |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/projects/{project_id}/digitalocean`                                                               |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/projects/{project_id}/github`                                                                     |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/projects/{project_id}/slack`                                                                      |             |                 |             |                  |
| <li>- [ ] `GET /api/oauth/slack/callback`                                                                                   |             |                 |             |                  |
| <li>- [x] `POST /api/password/reset/finalize`                                                                               |             |                 |             | yes              |
| <li>- [x] `POST /api/password/reset/initiate`                                                                               |             |                 |             | yes              |
| <li>- [x] `POST /api/password/reset/verify`                                                                                 |             |                 |             | yes              |
| <li>- [x] `POST /api/projects`                                                                                              |             |                 |             | yes              |
| <li>- [ ] `DELETE /api/projects/{project_id}`                                                                               |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}`                                                                                  |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/ci/actions/create`                                                               |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/ci/actions/generate`                                                             |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/clusters`                                                                         |             |                 |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/clusters`                                                                        |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/clusters/candidates`                                                             |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/clusters/candidates`                                                              |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/clusters/candidates/{candidate_id}/resolve`                                      |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/clusters/{cluster_id}`                                                            |             |                 |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/clusters/{cluster_id}`                                                           |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/clusters/{cluster_id}`                                                         |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/clusters/{cluster_id}/node/{node_name}`                                           |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/clusters/{cluster_id}/nodes`                                                      |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/collaborators`                                                                    |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/delete/{name}`                                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/deploy/addon/{name}/{version}`                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/deploy/{name}/{version}`                                                         |             |                 |             |                  |
| <li>- [X] `GET /api/projects/{project_id}/gitrepos`                                                                         | AB          |                 |             |                  |
| <li>- [X] `GET /api/projects/{project_id}/gitrepos/{installation_id}/repos`                                                 | AB          |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/gitrepos/{installation_id}/repos/{kind}/{owner}/{name}/branches`                  |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/gitrepos/{installation_id}/repos/{kind}/{owner}/{name}/{branch}/buildpack/detect` |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/gitrepos/{installation_id}/repos/{kind}/{owner}/{name}/{branch}/contents`         |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/gitrepos/{installation_id}/repos/{kind}/{owner}/{name}/{branch}/procfile`         |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/gitrepos/{installation_id}/repos/{kind}/{owner}/{name}/{branch}/tarball_url`      |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/helmrepos`                                                                        |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/helmrepos`                                                                       |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/helmrepos/{helm_id}/charts`                                                       |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/infra`                                                                            |             |                 |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/infra/{infra_id}/docr/destroy`                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/infra/{infra_id}/doks/destroy`                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/infra/{infra_id}/ecr/destroy`                                                    |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/infra/{infra_id}/eks/destroy`                                                    |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/infra/{infra_id}/gke/destroy`                                                    |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/infra/{infra_id}/test/destroy`                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/integrations/aws`                                                                |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/integrations/aws/{aws_integration_id}/overwrite`                                 |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/integrations/basic`                                                              |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/integrations/gcp`                                                                |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/integrations/oauth`                                                               |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/invites`                                                                          |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/invites`                                                                         |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/invites/{invite_id}`                                                             |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/invites/{invite_id}`                                                           |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/invites/{token}`                                                                  |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/k8s/configmap`                                                                    |             | yes             |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/k8s/configmap/create`                                                            |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/k8s/configmap/delete`                                                          |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/configmap/list`                                                               |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/k8s/configmap/rename`                                                            |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/k8s/configmap/update`                                                            |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/helm_releases`                                                                |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/k8s/jobs/{namespace}/{name}`                                                   |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/jobs/{namespace}/{name}/pods`                                                 |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/k8s/jobs/{namespace}/{name}/stop`                                                |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/k8s/kubeconfig`                                                                   |             | yes             | yes         |                  |
| <li>- [x] `GET /api/projects/{project_id}/k8s/metrics`                                                                      |             | yes             |             | yes              |
| <li>- [x] `GET /api/projects/{project_id}/k8s/namespaces`                                                                   |             | yes             |             | yes              |
| <li>- [x] `POST /api/projects/{project_id}/k8s/namespaces/create`                                                           |             | yes             |             | yes              |
| <li>- [x] `DELETE /api/projects/{project_id}/k8s/namespaces/delete`                                                         |             | yes             |             | yes              |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/pods`                                                                         |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/k8s/pods/{namespace}/{name}`                                                   |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/pods/{namespace}/{name}/events/list`                                          |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/k8s/prometheus/detect`                                                            |             | yes             |             | yes              |
| <li>- [x] `GET /api/projects/{project_id}/k8s/prometheus/ingresses`                                                         |             | yes             |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/k8s/subdomain`                                                                   |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/{namespace}/ingress/{name}`                                                   |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/{namespace}/pod/{name}/logs`                                                  |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/{kind}/status`                                                                |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/{namespace}/{name}/jobs/status`                                               |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/k8s/{namespace}/{chart}/{release_name}/jobs`                                      |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/policy`                                                                           |             |                 |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/provision/docr`                                                                  |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/provision/doks`                                                                  |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/provision/ecr`                                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/provision/eks`                                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/provision/gcr`                                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/provision/gke`                                                                   |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/provision/test`                                                                  |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/provision/{kind}/{infra_id}/logs`                                                 |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/registries`                                                                      |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries`                                                                       |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries/dockerhub/token`                                                       |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries/docr/token`                                                            |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries/ecr/{region}/token`                                                    |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries/gcr/token`                                                             |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/registries/{registry_id}`                                                      |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/registries/{registry_id}`                                                        |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries/{registry_id}/repositories`                                            |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/registries/{registry_id}/repositories/*`                                          |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/registries/{registry_id}/repository`                                             |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/releases`                                                                         |             | yes             |             | yes              |
| <li>- [ ] `POST /api/projects/{project_id}/releases/image/update/batch`                                                     |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/releases/{name}/history`                                                          |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/releases/{name}/notifications`                                                   |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/releases/{name}/notifications`                                                    |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/releases/{name}/rollback`                                                        |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/releases/{name}/upgrade`                                                         |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/releases/{name}/webhook_token`                                                    |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/releases/{name}/webhook_token`                                                   |             |                 |             |                  |
| <li>- [x] `GET /api/projects/{project_id}/releases/{name}/{revision}`                                                       |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/releases/{name}/{revision}/components`                                            |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/releases/{name}/{revision}/controllers`                                           |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/releases/{name}/{revision}/pods/all`                                              |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/roles`                                                                            |             |                 |             |                  |
| <li>- [ ] `POST /api/projects/{project_id}/roles/{user_id}`                                                                 |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/roles/{user_id}`                                                               |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/slack_integrations`                                                               |             |                 |             |                  |
| <li>- [ ] `GET /api/projects/{project_id}/slack_integrations/exists`                                                        |             |                 |             |                  |
| <li>- [ ] `DELETE /api/projects/{project_id}/slack_integrations/{slack_integration_id}`                                     |             |                 |             |                  |
| <li>- [ ] `GET /api/readyz`                                                                                                 |             |                 |             |                  |
| <li>- [ ] `GET /api/templates`                                                                                              |             |                 |             |                  |
| <li>- [ ] `GET /api/templates/upgrade_notes/{name}/{version}`                                                               |             |                 |             |                  |
| <li>- [ ] `GET /api/templates/{name}/{version}`                                                                             |             |                 |             |                  |
| <li>- [x] `POST /api/users`                                                                                                 |             |                 |             | yes              |
| <li>- [x] `GET /api/users/{user_id}`                                                                                        |             | yes             |             | yes              |
| <li>- [x] `DELETE /api/users/{user_id}`                                                                                     |             | yes             |             |                  |
| <li>- [x] `GET /api/users/{user_id}/projects`                                                                               |             | yes             |             | yes              |
| <li>- [ ] `POST /api/webhooks/deploy/{token}`                                                                               |             |                 |             |                  |