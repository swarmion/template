export const projectName = 'sls-monorepo';
export const region = 'eu-west-1';
export const LAMBDAS_NODE_OPTIONS =
  '--enable-source-maps --stack-trace-limit=1000';
export const defaultEnvironment = 'dev';

export const httpApiIdExportName =
  '${self:custom.projectName}-HttpApiId-${self:provider.stage}';

export const sharedEnvsConfig = {
  dev: {
    profile: 'sls-monorepo-developer',
    apiGatewayCorsAllowedOrigins: ['http://localhost:3000'],
  },
  staging: {
    profile: '',
    apiGatewayCorsAllowedOrigins: ['https://staging.my-domain.com'],
  },
  production: {
    profile: '',
    apiGatewayCorsAllowedOrigins: ['https://www.my-domain.com'],
  },
};

export const esbuildConfig = {
  packager: 'yarn',
  bundle: true,
  minify: false,
  sourcemap: true,
  exclude: ['aws-sdk'],
  target: 'node14',
  platform: 'node',
  mainFields: ['module', 'main'],
  concurrency: 5,
};
