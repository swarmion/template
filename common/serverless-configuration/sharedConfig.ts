export const projectName = 'sls-monorepo';
export const LAMBDAS_NODE_OPTIONS =
  '--enable-source-maps --stack-trace-limit=1000';
export const defaultEnvironment = 'dev';

const httpApiAuthorizerId = {
  'Fn::ImportValue':
    '${self:custom.projectName}-HttpApiAuthorizerId-${self:provider.stage}',
};

export const sharedEnvsConfig = {
  dev: {
    profile: 'sls-monorepo-developer',
    apiGatewayCorsAllowedOrigins: ['http://localhost:3000'],
    httpApiAuthorizerId,
  },
  staging: {
    profile: '',
    apiGatewayCorsAllowedOrigins: ['https://staging.my-domain.com'],
    httpApiAuthorizerId,
  },
  production: {
    profile: '',
    apiGatewayCorsAllowedOrigins: ['https://www.my-domain.com'],
    httpApiAuthorizerId,
  },
};
