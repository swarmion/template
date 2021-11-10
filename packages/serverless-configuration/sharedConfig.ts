export const projectName = 'sls-monorepo';
export const region = 'eu-west-1';

export const defaultEnvironment = 'dev';

export const sharedProviderConfig = {
  name: 'aws',
  runtime: 'nodejs14.x',
  region,
  profile: '${self:custom.sharedEnvsConfig.${self:provider.stage}.profile}', // Used to point to the right AWS account
  stage: "${opt:stage, 'dev'}", // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
  lambdaHashingVersion: '20201221',
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
  },
  eventBridge: {
    useCloudFormation: true,
  },
} as const;

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

export const sharedEsbuildConfig = {
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
