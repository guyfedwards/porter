import { baseApi } from "./baseApi";

import { FullActionConfigType, StorageType } from "./types";

/**
 * Generic api call format
 * @param {string} token - Bearer token.
 * @param {Object} params - Body params.
 * @param {Object} pathParams - Path params.
 * @param {(err: Object, res: Object) => void} callback - Callback function.
 */

const checkAuth = baseApi("GET", "/api/users/current");

const connectECRRegistry = baseApi<
  {
    name: string;
    aws_integration_id: string;
  },
  { id: number }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/registries`;
});

const connectGCRRegistry = baseApi<
  {
    name: string;
    gcp_integration_id: string;
    url: string;
  },
  { id: number }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/registries`;
});

const connectDORegistry = baseApi<
  {
    name: string;
    do_integration_id: string;
    url: string;
  },
  { project_id: number }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/registries`;
});

const getAWSIntegration = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/integrations/aws`
);

const getGCPIntegration = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/integrations/gcp`
);

const createAWSIntegration = baseApi<
  {
    aws_region: string;
    aws_cluster_id?: string;
    aws_access_key_id: string;
    aws_secret_access_key: string;
  },
  { id: number }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/integrations/aws`;
});

const overwriteAWSIntegration = baseApi<
  {
    aws_integration_id: number;
    aws_access_key_id: string;
    aws_secret_access_key: string;
    cluster_id: number;
  },
  {
    project_id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/integrations/aws/overwrite`;
});

const createDOCR = baseApi<
  {
    do_integration_id: number;
    docr_name: string;
    docr_subscription_tier: string;
  },
  {
    project_id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/provision/docr`;
});

const createDOKS = baseApi<
  {
    do_integration_id: number;
    doks_name: string;
    do_region: string;
    issuer_email: string;
  },
  {
    project_id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/provision/doks`;
});

const createEmailVerification = baseApi<{}, {}>("POST", (pathParams) => {
  return `/api/email/verify/initiate`;
});

const createEnvironment = baseApi<
  {
    name: string;
  },
  {
    project_id: number;
    cluster_id: number;
    git_installation_id: number;
    git_repo_owner: string;
    git_repo_name: string;
  }
>("POST", (pathParams) => {
  let {
    project_id,
    cluster_id,
    git_installation_id,
    git_repo_owner,
    git_repo_name,
  } = pathParams;
  return `/api/projects/${project_id}/gitrepos/${git_installation_id}/${git_repo_owner}/${git_repo_name}/clusters/${cluster_id}/environment`;
});

const deleteEnvironment = baseApi<
  {
    name: string;
  },
  {
    project_id: number;
    cluster_id: number;
    git_installation_id: number;
    git_repo_owner: string;
    git_repo_name: string;
  }
>("DELETE", (pathParams) => {
  let {
    project_id,
    cluster_id,
    git_installation_id,
    git_repo_owner,
    git_repo_name,
  } = pathParams;
  return `/api/projects/${project_id}/gitrepos/${git_installation_id}/${git_repo_owner}/${git_repo_name}/clusters/${cluster_id}/environment`;
});

const listEnvironments = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  let { project_id, cluster_id } = pathParams;
  return `/api/projects/${project_id}/clusters/${cluster_id}/environments`;
});

const createGCPIntegration = baseApi<
  {
    gcp_key_data: string;
    gcp_project_id: string;
  },
  {
    project_id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/integrations/gcp`;
});

const createGCR = baseApi<
  {
    gcp_integration_id: number;
  },
  {
    project_id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/provision/gcr`;
});

const createGKE = baseApi<
  {
    gcp_region: string;
    gcp_integration_id: number;
    gke_name: string;
    issuer_email: string;
  },
  {
    project_id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/provision/gke`;
});

const createInvite = baseApi<
  {
    email: string;
    kind: string;
  },
  {
    id: number;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/invites`;
});

const createPasswordReset = baseApi<
  {
    email: string;
  },
  {}
>("POST", (pathParams) => {
  return `/api/password/reset/initiate`;
});

const createPasswordResetVerify = baseApi<
  {
    email: string;
    token: string;
    token_id: number;
  },
  {}
>("POST", (pathParams) => {
  return `/api/password/reset/verify`;
});

const createPasswordResetFinalize = baseApi<
  {
    email: string;
    token: string;
    token_id: number;
    new_password: string;
  },
  {}
>("POST", (pathParams) => {
  return `/api/password/reset/finalize`;
});

const createProject = baseApi<{ name: string }, {}>("POST", (pathParams) => {
  return `/api/projects`;
});

const createSubdomain = baseApi<
  {},
  {
    id: number;
    release_name: string;
    namespace: string;
    cluster_id: number;
  }
>("POST", (pathParams) => {
  let { cluster_id, id, namespace, release_name } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${release_name}/subdomain`;
});

const deleteCluster = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
  }
>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/clusters/${pathParams.cluster_id}`;
});

const deleteInvite = baseApi<{}, { id: number; invId: number }>(
  "DELETE",
  (pathParams) => {
    return `/api/projects/${pathParams.id}/invites/${pathParams.invId}`;
  }
);

const deletePod = baseApi<
  {},
  { name: string; namespace: string; id: number; cluster_id: number }
>("DELETE", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/pods/${name}`;
});

const getPodEvents = baseApi<
  {},
  { name: string; namespace: string; id: number; cluster_id: number }
>("GET", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/pods/${name}/events`;
});

const deleteProject = baseApi<{}, { id: number }>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.id}`;
});

const deleteRegistryIntegration = baseApi<
  {},
  {
    project_id: number;
    registry_id: number;
  }
>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/registries/${pathParams.registry_id}`;
});

const deleteSlackIntegration = baseApi<
  {},
  {
    project_id: number;
    slack_integration_id: number;
  }
>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/slack_integrations/${pathParams.slack_integration_id}`;
});

const updateNotificationConfig = baseApi<
  {
    payload: any;
  },
  {
    project_id: number;
    cluster_id: number;
    namespace: string;
    name: string;
  }
>("POST", (pathParams) => {
  let { project_id, cluster_id, namespace, name } = pathParams;

  return `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/notifications`;
});

const getPRDeploymentList = baseApi<
  {
    status?: string[];
  },
  {
    cluster_id: number;
    project_id: number;
  }
>("GET", (pathParams) => {
  const { cluster_id, project_id } = pathParams;

  return `/api/projects/${project_id}/clusters/${cluster_id}/deployments`;
});

const getPRDeploymentByCluster = baseApi<
  {
    namespace: string;
  },
  {
    cluster_id: number;
    project_id: number;
    environment_id: number;
  }
>("GET", (pathParams) => {
  const { cluster_id, project_id, environment_id } = pathParams;

  return `/api/projects/${project_id}/clusters/${cluster_id}/${environment_id}/deployment`;
});

const getPRDeployment = baseApi<
  {
    namespace: string;
  },
  {
    cluster_id: number;
    project_id: number;
    git_installation_id: number;
    git_repo_owner: string;
    git_repo_name: string;
  }
>("GET", (pathParams) => {
  const {
    cluster_id,
    project_id,
    git_installation_id,
    git_repo_owner,
    git_repo_name,
  } = pathParams;
  return `/api/projects/${project_id}/gitrepos/${git_installation_id}/${git_repo_owner}/${git_repo_name}/clusters/${cluster_id}/deployment`;
});

const getNotificationConfig = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
    namespace: string;
    name: string;
  }
>("GET", (pathParams) => {
  let { project_id, cluster_id, namespace, name } = pathParams;

  return `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/notifications`;
});

const getGHAWorkflowTemplate = baseApi<
  {
    release_name: string;
    github_action_config: FullActionConfigType;
  },
  {
    cluster_id: number;
    project_id: number;
    namespace: string;
  }
>("POST", (pathParams) => {
  const { cluster_id, project_id, namespace } = pathParams;

  return `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/releases/gha_template`;
});

const deployTemplate = baseApi<
  {
    template_name: string;
    template_version: string;
    image_url?: string;
    values?: any;
    name: string;
    github_action_config?: FullActionConfigType;
    build_config?: any;
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
    repo_url?: string;
  }
>("POST", (pathParams) => {
  let { cluster_id, id, namespace, repo_url } = pathParams;

  if (repo_url) {
    return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases?repo_url=${repo_url}`;
  }
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases`;
});

const deployAddon = baseApi<
  {
    template_name: string;
    template_version: string;
    values?: any;
    name: string;
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
    repo_url?: string;
  }
>("POST", (pathParams) => {
  let { cluster_id, id, namespace, repo_url } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/addons?repo_url=${repo_url}`;
});

const detectBuildpack = baseApi<
  {},
  {
    project_id: number;
    git_repo_id: number;
    kind: string;
    owner: string;
    name: string;
    branch: string;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos/${
    pathParams.git_repo_id
  }/repos/${pathParams.kind}/${pathParams.owner}/${
    pathParams.name
  }/${encodeURIComponent(pathParams.branch)}/buildpack/detect`;
});

const getBranchContents = baseApi<
  {
    dir: string;
  },
  {
    project_id: number;
    git_repo_id: number;
    kind: string;
    owner: string;
    name: string;
    branch: string;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos/${
    pathParams.git_repo_id
  }/repos/${pathParams.kind}/${pathParams.owner}/${
    pathParams.name
  }/${encodeURIComponent(pathParams.branch)}/contents`;
});

const getProcfileContents = baseApi<
  {
    path: string;
  },
  {
    project_id: number;
    git_repo_id: number;
    kind: string;
    owner: string;
    name: string;
    branch: string;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos/${
    pathParams.git_repo_id
  }/repos/${pathParams.kind}/${pathParams.owner}/${
    pathParams.name
  }/${encodeURIComponent(pathParams.branch)}/procfile`;
});

const getBranches = baseApi<
  {},
  {
    project_id: number;
    git_repo_id: number;
    kind: string;
    owner: string;
    name: string;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos/${pathParams.git_repo_id}/repos/${pathParams.kind}/${pathParams.owner}/${pathParams.name}/branches`;
});

const getChart = baseApi<
  {},
  {
    id: number;
    cluster_id: number;
    namespace: string;
    name: string;
    revision: number;
  }
>("GET", (pathParams) => {
  let { id, cluster_id, namespace, name, revision } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/${revision}`;
});

const getCharts = baseApi<
  {
    limit: number;
    skip: number;
    byDate: boolean;
    statusFilter: string[];
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/releases`;
});

const getChartComponents = baseApi<
  {},
  {
    id: number;
    cluster_id: number;
    namespace: string;
    name: string;
    revision: number;
  }
>("GET", (pathParams) => {
  let { id, cluster_id, namespace, name, revision } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/${revision}/components`;
});

const getChartControllers = baseApi<
  {},
  {
    id: number;
    cluster_id: number;
    namespace: string;
    name: string;
    revision: number;
  }
>("GET", (pathParams) => {
  let { id, cluster_id, namespace, name, revision } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/${revision}/controllers`;
});

const getClusterIntegrations = baseApi("GET", "/api/integrations/cluster");

const getClusters = baseApi<{}, { id: number }>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters`;
});

const getCluster = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/clusters/${pathParams.cluster_id}`;
});

const getClusterNodes = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/clusters/${pathParams.cluster_id}/nodes`;
});

const getClusterNode = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
    nodeName: string;
  }
>(
  "GET",
  (pathParams) =>
    `/api/projects/${pathParams.project_id}/clusters/${pathParams.cluster_id}/nodes/${pathParams.nodeName}`
);

const getGitRepoList = baseApi<
  {},
  {
    project_id: number;
    git_repo_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos/${pathParams.git_repo_id}/repos`;
});

const getGitRepoPermission = baseApi<
  {},
  {
    project_id: number;
    git_repo_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos/${pathParams.git_repo_id}/permissions`;
});

const getGitRepos = baseApi<
  {},
  {
    project_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/gitrepos`;
});

const getImageRepos = baseApi<
  {},
  {
    project_id: number;
    registry_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/registries/${pathParams.registry_id}/repositories`;
});

const getImageTags = baseApi<
  {},
  {
    project_id: number;
    registry_id: number;
    repo_name: string;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/registries/${pathParams.registry_id}/repositories/${pathParams.repo_name}`;
});

const getInfra = baseApi<
  {},
  {
    project_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/infra`;
});

const getInfraDesired = baseApi<
  {},
  {
    project_id: number;
    infra_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/infras/${pathParams.infra_id}/desired`;
});

const getInfraCurrent = baseApi<
  {},
  {
    project_id: number;
    infra_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/infras/${pathParams.infra_id}/current`;
});

const getIngress = baseApi<
  {},
  { namespace: string; cluster_id: number; name: string; id: number }
>("GET", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/ingresses/${name}`;
});

const getInvites = baseApi<{}, { id: number }>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/invites`;
});

const getJobs = baseApi<
  {},
  { namespace: string; cluster_id: number; release_name: string; id: number }
>("GET", (pathParams) => {
  let { id, release_name, cluster_id, namespace } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${release_name}/0/jobs`;
});

const getJobStatus = baseApi<
  {},
  { namespace: string; cluster_id: number; release_name: string; id: number }
>("GET", (pathParams) => {
  let { id, release_name, cluster_id, namespace } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${release_name}/0/jobs/status`;
});

const getJobPods = baseApi<
  {},
  { name: string; namespace: string; id: number; cluster_id: number }
>("GET", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/jobs/${name}/pods`;
});

const getPodByName = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
    namespace: string;
    name: string;
  }
>(
  "GET",
  ({ project_id, cluster_id, namespace, name }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/pods/${name}`
);

const getMatchingPods = baseApi<
  {
    namespace: string;
    selectors: string[];
  },
  { id: number; cluster_id: number }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/pods`;
});

const getMetrics = baseApi<
  {
    metric: string;
    shouldsum: boolean;
    pods?: string[];
    kind?: string; // the controller kind
    name?: string;
    percentile?: number;
    namespace: string;
    startrange: number;
    endrange: number;
    resolution: string;
  },
  {
    id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/metrics`;
});

const getNamespaces = baseApi<
  {},
  {
    id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces`;
});

const getNGINXIngresses = baseApi<
  {},
  {
    id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/prometheus/ingresses`;
});

const getOAuthIds = baseApi<
  {},
  {
    project_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/integrations/oauth`;
});

const getProjectClusters = baseApi<{}, { id: number }>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters`;
});

const getProjectRegistries = baseApi<{}, { id: number }>(
  "GET",
  (pathParams) => {
    return `/api/projects/${pathParams.id}/registries`;
  }
);

const getProjectRepos = baseApi<{}, { id: number }>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/repos`;
});

const getProjects = baseApi("GET", "/api/projects");

const getPrometheusIsInstalled = baseApi<
  {},
  {
    id: number;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/prometheus/detect`;
});

const getRegistryIntegrations = baseApi("GET", "/api/integrations/registry");

const getReleaseToken = baseApi<
  {},
  { name: string; id: number; namespace: string; cluster_id: number }
>("GET", (pathParams) => {
  let { id, cluster_id, namespace, name } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/webhook`;
});

const getReleaseSteps = baseApi<
  {},
  { name: string; id: number; namespace: string; cluster_id: number }
>("GET", (pathParams) => {
  let { id, cluster_id, namespace, name } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/steps`;
});

const destroyInfra = baseApi<
  {
    name: string;
  },
  {
    project_id: number;
    infra_id: number;
  }
>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.project_id}/infras/${pathParams.infra_id}`;
});

const getRepoIntegrations = baseApi("GET", "/api/integrations/repo");

const getRepos = baseApi<{}, { id: number }>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/repos`;
});

const getSlackIntegrations = baseApi<{}, { id: number }>(
  "GET",
  (pathParams) => {
    return `/api/projects/${pathParams.id}/slack_integrations`;
  }
);

const getRevisions = baseApi<
  {},
  { id: number; cluster_id: number; namespace: string; name: string }
>("GET", (pathParams) => {
  let { id, cluster_id, namespace, name } = pathParams;

  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/history`;
});

const getTemplateInfo = baseApi<
  {
    repo_url?: string;
  },
  { name: string; version: string }
>("GET", (pathParams) => {
  return `/api/templates/${pathParams.name}/${pathParams.version}`;
});

const getTemplateUpgradeNotes = baseApi<
  {
    repo_url?: string;
    prev_version: string;
  },
  { name: string; version: string }
>("GET", (pathParams) => {
  return `/api/templates/${pathParams.name}/${pathParams.version}/upgrade_notes`;
});

const getTemplates = baseApi<
  {
    repo_url?: string;
  },
  {}
>("GET", "/api/templates");

const getMetadata = baseApi<{}, {}>("GET", () => {
  return `/api/metadata`;
});

const postWelcome = baseApi<{
  email: string;
  isCompany: boolean;
  company: string;
  role: string;
}>("POST", () => {
  return `/api/welcome`;
});

const linkGithubProject = baseApi<
  {},
  {
    project_id: number;
  }
>("GET", (pathParams) => {
  return `/api/oauth/projects/${pathParams.project_id}/github`;
});

const getGithubAccounts = baseApi<{}, {}>("GET", () => {
  return `/api/integrations/github-app/accounts`;
});

const logInUser = baseApi<{
  email: string;
  password: string;
}>("POST", "/api/login");

const logOutUser = baseApi("POST", "/api/logout");

const provisionECR = baseApi<
  {
    ecr_name: string;
    aws_integration_id: number;
  },
  { id: number }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/provision/ecr`;
});

const provisionEKS = baseApi<
  {
    eks_name: string;
    aws_integration_id: number;
    machine_type: string;
    issuer_email: string;
  },
  { id: number }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/provision/eks`;
});

const registerUser = baseApi<{
  email: string;
  password: string;
}>("POST", "/api/users");

const rollbackChart = baseApi<
  {
    revision: number;
  },
  {
    id: number;
    name: string;
    namespace: string;
    cluster_id: number;
  }
>("POST", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/0/rollback`;
});

const uninstallTemplate = baseApi<
  {},
  {
    id: number;
    name: string;
    cluster_id: number;
    namespace: string;
  }
>("DELETE", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/0`;
});

const updateUser = baseApi<
  {
    rawKubeConfig?: string;
    allowedContexts?: string[];
  },
  { id: number }
>("PUT", (pathParams) => {
  return `/api/users/${pathParams.id}`;
});

const upgradeChartValues = baseApi<
  {
    values: string;
    version?: string;
  },
  {
    id: number;
    name: string;
    namespace: string;
    cluster_id: number;
  }
>("POST", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${name}/0/upgrade`;
});

const listEnvGroups = baseApi<
  {},
  {
    id: number;
    namespace: string;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/envgroups/list`;
});

const listConfigMaps = baseApi<
  {},
  {
    id: number;
    namespace: string;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/configmap/list`;
});

const getEnvGroup = baseApi<
  {},
  {
    id: number;
    namespace: string;
    cluster_id: number;
    name: string;
    version?: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${
    pathParams.cluster_id
  }/namespaces/${pathParams.namespace}/envgroup?name=${pathParams.name}${
    pathParams.version ? "&version=" + pathParams.version : ""
  }`;
});

const getConfigMap = baseApi<
  {
    name: string;
  },
  {
    id: number;
    namespace: string;
    cluster_id: number;
  }
>("GET", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/configmap`;
});

const createEnvGroup = baseApi<
  {
    name: string;
    variables: Record<string, string>;
    secret_variables?: Record<string, string>;
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/envgroup/create`;
});

const updateEnvGroup = baseApi<
  {
    name: string;
    variables: { [key: string]: string };
    secret_variables?: { [key: string]: string };
  },
  {
    project_id: number;
    cluster_id: number;
    namespace: string;
  }
>(
  "POST",
  ({ cluster_id, project_id, namespace }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/envgroup/create`
);

const createConfigMap = baseApi<
  {
    name: string;
    variables: Record<string, string>;
    secret_variables?: Record<string, string>;
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/configmap/create`;
});

const updateConfigMap = baseApi<
  {
    name: string;
    variables: Record<string, string>;
    secret_variables?: Record<string, string>;
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
  }
>("POST", (pathParams) => {
  let { id, cluster_id } = pathParams;
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/configmap/update`;
});

const renameConfigMap = baseApi<
  {
    name: string;
    new_name: string;
  },
  {
    id: number;
    cluster_id: number;
    namespace: string;
  }
>("POST", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/configmap/rename`;
});

const deleteEnvGroup = baseApi<
  {
    name: string;
  },
  {
    id: number;
    namespace: string;
    cluster_id: number;
  }
>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/envgroup`;
});

const deleteConfigMap = baseApi<
  {
    name: string;
  },
  {
    id: number;
    namespace: string;
    cluster_id: number;
  }
>("DELETE", (pathParams) => {
  return `/api/projects/${pathParams.id}/clusters/${pathParams.cluster_id}/namespaces/${pathParams.namespace}/configmap/delete`;
});

const createNamespace = baseApi<
  {
    name: string;
  },
  { id: number; cluster_id: number }
>("POST", (pathParams) => {
  let { id, cluster_id } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/create`;
});

const deleteNamespace = baseApi<
  {
    name: string;
  },
  {
    id: number;
    cluster_id: number;
  }
>("DELETE", (pathParams) => {
  let { id, cluster_id } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/delete`;
});

const deleteJob = baseApi<
  {},
  { name: string; namespace: string; id: number; cluster_id: number }
>("DELETE", (pathParams) => {
  let { id, name, cluster_id, namespace } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/jobs/${name}`;
});

const stopJob = baseApi<
  {},
  { name: string; namespace: string; id: number; cluster_id: number }
>("POST", (pathParams) => {
  let { id, name, namespace, cluster_id } = pathParams;
  return `/api/projects/${id}/clusters/${cluster_id}/namespaces/${namespace}/jobs/${name}/stop`;
});

const getAvailableRoles = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/roles`
);

const updateInvite = baseApi<
  { kind: string },
  { project_id: number; invite_id: number }
>(
  "POST",
  ({ project_id, invite_id }) =>
    `/api/projects/${project_id}/invites/${invite_id}`
);

const getCollaborators = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/collaborators`
);

const updateCollaborator = baseApi<
  {
    kind: string;
    user_id: number;
  },
  { project_id: number }
>("POST", ({ project_id }) => `/api/projects/${project_id}/roles`);

const removeCollaborator = baseApi<{ user_id: number }, { project_id: number }>(
  "DELETE",
  ({ project_id }) => `/api/projects/${project_id}/roles`
);

const getPolicyDocument = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/policy`
);

const createWebhookToken = baseApi<
  {},
  {
    project_id: number;
    chart_name: string;
    namespace: string;
    cluster_id: number;
  }
>(
  "POST",
  ({ project_id, chart_name, namespace, cluster_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/releases/${chart_name}/0/webhook`
);

const getUsage = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/usage`
);

// Used for billing purposes
const getCustomerToken = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/billing/token`
);

const getHasBilling = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/billing`
);

const getOnboardingState = baseApi<{}, { project_id: number }>(
  "GET",
  ({ project_id }) => `/api/projects/${project_id}/onboarding`
);

const saveOnboardingState = baseApi<{}, { project_id: number }>(
  "POST",
  ({ project_id }) => `/api/projects/${project_id}/onboarding`
);

const getOnboardingInfra = baseApi<
  {},
  { project_id: number; registry_infra_id: number }
>(
  "GET",
  ({ project_id, registry_infra_id }) =>
    `/api/projects/${project_id}/infras/${registry_infra_id}`
);

const getOnboardingRegistry = baseApi<
  {},
  { project_id: number; registry_connection_id: number }
>(
  "GET",
  ({ project_id, registry_connection_id }) =>
    `/api/projects/${project_id}/registries/${registry_connection_id}`
);

const detectPorterAgent = baseApi<
  {},
  { project_id: number; cluster_id: number }
>(
  "GET",
  ({ project_id, cluster_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/agent/detect`
);

const installPorterAgent = baseApi<
  {},
  { project_id: number; cluster_id: number }
>(
  "POST",
  ({ cluster_id, project_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/agent/install`
);

const getKubeEvents = baseApi<
  {
    skip: number;
    resource_type: string;
    owner_type?: string;
    owner_name?: string;
    namespace?: string;
  },
  { project_id: number; cluster_id: number }
>("GET", ({ project_id, cluster_id }) => {
  return `/api/projects/${project_id}/clusters/${cluster_id}/kube_events`;
});

const getKubeEvent = baseApi<
  {},
  { project_id: number; cluster_id: number; kube_event_id: number }
>(
  "GET",
  ({ project_id, cluster_id, kube_event_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/kube_events/${kube_event_id}`
);

const getLogBuckets = baseApi<
  {},
  { project_id: number; cluster_id: number; kube_event_id: number }
>(
  "GET",
  ({ project_id, cluster_id, kube_event_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/kube_events/${kube_event_id}/log_buckets`
);

const getLogBucketLogs = baseApi<
  { timestamp: number },
  { project_id: number; cluster_id: number; kube_event_id: number }
>(
  "GET",
  ({ project_id, cluster_id, kube_event_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/kube_events/${kube_event_id}/logs`
);

const getCanCreateProject = baseApi<{}, {}>(
  "GET",
  () => "/api/can_create_project"
);

const addApplicationToEnvGroup = baseApi<
  {
    name: string; // Env Group name
    app_name: string;
  },
  { project_id: number; cluster_id: number; namespace: string }
>(
  "POST",
  ({ cluster_id, namespace, project_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/envgroup/add_application`
);

const removeApplicationFromEnvGroup = baseApi<
  {
    name: string; // Env Group name
    app_name: string;
  },
  { project_id: number; cluster_id: number; namespace: string }
>(
  "POST",
  ({ cluster_id, namespace, project_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/envgroup/remove_application`
);

const provisionDatabase = baseApi<
  {
    username: string;
    password: string;
    machine_type: string;
    db_storage_encrypted: boolean;
    db_name: string;
    db_max_allocated_storage: string;
    db_family: string;
    db_engine_version: string;
    db_allocated_storage: string;
  },
  { project_id: number; cluster_id: number; namespace: string }
>(
  "POST",
  ({ project_id, cluster_id, namespace }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/namespaces/${namespace}/provision/rds`
);

const getDatabases = baseApi<
  {},
  {
    project_id: number;
    cluster_id: number;
  }
>(
  "GET",
  ({ project_id, cluster_id }) =>
    `/api/projects/${project_id}/clusters/${cluster_id}/databases`
);

// Bundle export to allow default api import (api.<method> is more readable)
export default {
  checkAuth,
  connectECRRegistry,
  connectGCRRegistry,
  connectDORegistry,
  getAWSIntegration,
  getGCPIntegration,
  createAWSIntegration,
  overwriteAWSIntegration,
  createDOCR,
  createDOKS,
  createEmailVerification,
  createEnvironment,
  deleteEnvironment,
  listEnvironments,
  createGCPIntegration,
  createGCR,
  createGKE,
  createInvite,
  createNamespace,
  createPasswordReset,
  createPasswordResetVerify,
  createPasswordResetFinalize,
  createProject,
  createConfigMap,
  deleteCluster,
  deleteConfigMap,
  deleteInvite,
  deleteNamespace,
  deletePod,
  deleteProject,
  deleteRegistryIntegration,
  deleteSlackIntegration,
  updateNotificationConfig,
  getNotificationConfig,
  createSubdomain,
  deployTemplate,
  deployAddon,
  destroyInfra,
  detectBuildpack,
  getBranchContents,
  getBranches,
  getMetadata,
  postWelcome,
  getChart,
  getCharts,
  getChartComponents,
  getChartControllers,
  getClusterIntegrations,
  getClusters,
  getCluster,
  getClusterNodes,
  getClusterNode,
  getConfigMap,
  getPRDeploymentList,
  getPRDeploymentByCluster,
  getPRDeployment,
  getGHAWorkflowTemplate,
  getGitRepoList,
  getGitRepoPermission,
  getGitRepos,
  getImageRepos,
  getImageTags,
  getInfra,
  getInfraDesired,
  getInfraCurrent,
  getIngress,
  getInvites,
  getJobs,
  getJobStatus,
  getJobPods,
  getPodByName,
  getMatchingPods,
  getMetrics,
  getNamespaces,
  getNGINXIngresses,
  getOAuthIds,
  getPodEvents,
  getProcfileContents,
  getProjectClusters,
  getProjectRegistries,
  getProjectRepos,
  getProjects,
  getPrometheusIsInstalled,
  getRegistryIntegrations,
  getReleaseToken,
  getReleaseSteps,
  getRepoIntegrations,
  getSlackIntegrations,
  getRepos,
  getRevisions,
  getTemplateInfo,
  getTemplateUpgradeNotes,
  getTemplates,
  linkGithubProject,
  getGithubAccounts,
  listConfigMaps,
  logInUser,
  logOutUser,
  provisionECR,
  provisionEKS,
  registerUser,
  rollbackChart,
  uninstallTemplate,
  updateUser,
  renameConfigMap,
  updateConfigMap,
  upgradeChartValues,
  deleteJob,
  stopJob,
  updateInvite,
  getAvailableRoles,
  getCollaborators,
  updateCollaborator,
  removeCollaborator,
  getPolicyDocument,
  createWebhookToken,
  getUsage,
  getCustomerToken,
  getHasBilling,
  getOnboardingState,
  saveOnboardingState,
  getOnboardingInfra,
  getOnboardingRegistry,
  detectPorterAgent,
  installPorterAgent,
  getKubeEvents,
  getKubeEvent,
  getLogBuckets,
  getLogBucketLogs,
  getCanCreateProject,
  createEnvGroup,
  updateEnvGroup,
  listEnvGroups,
  getEnvGroup,
  deleteEnvGroup,
  addApplicationToEnvGroup,
  removeApplicationFromEnvGroup,
  provisionDatabase,
  getDatabases,
};
