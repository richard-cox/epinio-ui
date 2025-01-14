import EpinioAppChartModel from './models/appcharts';
import EpinioApplicationModel from './models/applications';
import EpinioCatalogServiceModel from './models/catalogservices';
import EpinioConfigurationModel from './models/configurations';
import EpinioServiceModel from './models/services';

export const EPINIO_PRODUCT_NAME = 'epinio';

export const EPINIO_MGMT_STORE = 'epiniomgmt';

// // An endpoint with this name is automatically created by the standalone backend
export const EPINIO_STANDALONE_CLUSTER_NAME = 'default';

export const EPINIO_TYPES = {
  // From API
  APP:              'applications',
  APP_CHARTS:       'appcharts',
  NAMESPACE:        'namespaces',
  CONFIGURATION:    'configurations',
  CATALOG_SERVICE:  'catalogservices',
  SERVICE_INSTANCE: 'services',
  // Internal
  DASHBOARD:        'dashboard',
  INSTANCE:         'instance',
  APP_ACTION:       'application-action',
  APP_INSTANCE:     'application-instance',
};

// // https://github.com/epinio/epinio/blob/7eb93b6dc735f8a6db26b8a242ae62a34877014c/pkg/api/core/v1/models/models.go#L96
export const APPLICATION_MANIFEST_SOURCE_TYPE = {
  NONE:      0,
  PATH:      1,
  GIT:       2,
  CONTAINER: 3,
};

// ------------ App Source Info (used within the UI) --------------
export enum APPLICATION_SOURCE_TYPE {
  CONTAINER_URL = 'container_url', // eslint-disable-line no-unused-vars
  ARCHIVE = 'archive', // eslint-disable-line no-unused-vars
  FOLDER = 'folder', // eslint-disable-line no-unused-vars
  GIT_URL = 'git_url', // eslint-disable-line no-unused-vars
  GIT_HUB = 'github', // eslint-disable-line no-unused-vars
  GIT_LAB = 'gitlab', // eslint-disable-line no-unused-vars
}

export enum GitProvider {
  // eslint-disable-next-line no-unused-vars
  GIT = 'git', // eslint-disable-next-line no-unused-vars
  GIT_HUB = 'github', // eslint-disable-next-line no-unused-vars
  GIT_HUB_ENTERPRISE = 'github_enterprise', // eslint-disable-next-line no-unused-vars
  GIT_LAB = 'gitlab', // eslint-disable-next-line no-unused-vars
  GIT_LAB_ENTERPRISE = 'gitlab_enterprise', // eslint-disable-next-line no-unused-vars
  UNKNOWN = 'unknown'
}

export interface AppSourceArchive {
  tarball: string,
  fileName: string
}

export interface AppSourceContainer {
  url: string,
}

export interface AppSourceGitUrl {
  url: string,
  branch: string
}

export type GitAPIData = {
  repos: any[],
  branches: any[],
  commits: any[]
}

export interface AppSourceGit {
  usernameOrOrg?: string,
  repo: { id?: string, name: string },
  commit: string,
  branch: { id?: string, name: string },
  url: string,
  sourceData: GitAPIData
}

export interface AppSourceBuilderImage {
  value: string,
  default: boolean,
}

/**
 * Contains information used within a UI session to represent where an application came from
 */
export interface EpinioAppSource {
  type: string // APPLICATION_SOURCE_TYPE,
  archive: AppSourceArchive,
  container: AppSourceContainer,
  git: AppSourceGit,
  gitUrl: AppSourceGitUrl,
  builderImage: AppSourceBuilderImage,
  appChart: string,
}

export type EPINIO_APP_GIT_SOURCE = Omit<AppSourceGit, 'sourceData'>;

// ------------  --------------

export const APPLICATION_ACTION_STATE = {
  SUCCESS: 'success',
  RUNNING: 'running',
  FAIL:    'fail',
  PENDING: 'pending',
};

export const APPLICATION_PARTS = {
  VALUES:   'values',
  CHART:    'chart',
  IMAGE:    'image',
  MANIFEST: 'manifest'
};

// --------------------------------------
// Temporary code until models are typed
interface EpinioMeta {
  name: string,
  namespace?: string,
  createdAt: string,
}

interface EpinioMetaProperty {
  metadata: {
    name: string,
    namespace?: string
    creationTimestamp: string,
  }
}

export interface EpinioApplicationResource {
  configuration: {
    instances: number,
    configurations: string[],
    appchart?: string,
    environment: Map<string, string>,
    routes: string[]
  },
  image_url: string // eslint-disable-line camelcase
  meta: EpinioMeta
  origin: {
    Kind: number,
    archive: boolean,
    container: any,
    path: string
    git?: {
      provider: GitProvider,
      repository: string,
      branch: string,
      revision: string,
    }
  }
  stage_id: string // eslint-disable-line camelcase
  staging: {
    builder: string
  }
  status: string
  statusmessage: string
}

export type EpinioApplication = EpinioApplicationResource & EpinioApplicationModel & EpinioMetaProperty;

export interface EpinioApplicationChartResource {
  meta: EpinioMeta,
  description: string,
  helm_chart: string, // eslint-disable-line camelcase
  short_description: string, // eslint-disable-line camelcase
}

export type EpinioAppChart = EpinioApplicationChartResource & EpinioAppChartModel & EpinioMetaProperty;

export interface EpinioHelmRepoResource {
  name: string,
  url: string,
}

export interface EpinioCatalogServiceResource {
  name: string,
  description: string,
  short_description: string, // eslint-disable-line camelcase
  chart: string,
  chartVersion: string,
  appVersion: string,
  helm_repo: EpinioHelmRepoResource, // eslint-disable-line camelcase
  values: string,
}

export type EpinioCatalogService = EpinioCatalogServiceResource & EpinioCatalogServiceModel & EpinioMetaProperty;

export interface EpinioConfigurationResource {
  meta: EpinioMeta
  configuration: {
    user: string,
    details: Map<string, {}>,
    boundapps: string[],
  }
}

export type EpinioConfiguration = EpinioConfigurationResource & EpinioConfigurationModel & EpinioMetaProperty;

export interface EpinioServiceResource {
  meta: EpinioMeta
  boundapps: string[],
  catalog_service: string, // eslint-disable-line camelcase
  catalog_service_version: string, // eslint-disable-line camelcase
  status: string,
}

export type EpinioService = EpinioServiceResource & EpinioServiceModel & EpinioMetaProperty;

export interface EpinioInfo {
  default_builder_image: string, // eslint-disable-line camelcase
  kube_version: string, // eslint-disable-line camelcase
  platform: string, // eslint-disable-line camelcase
  version: string, // eslint-disable-line camelcase
}

export interface EpinioVersion {
  fullVersion: string,
  displayVersion: string,
}

export interface EpinioNamespace extends EpinioMetaProperty {
  apps: string[],
  configurations: string[],
}

export type EpinioCompRecord = Record<string, any>
