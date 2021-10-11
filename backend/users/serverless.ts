import {
  defaultEnvironment,
  esbuildConfig,
  httpApiIdExportName,
  LAMBDAS_NODE_OPTIONS,
  projectName,
  region,
  sharedEnvsConfig,
} from '@sls-monorepo/serverless-configuration';

import { AWS } from '@serverless/typescript';
import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-users`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.61.0',
  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region,
    profile: '${self:custom.sharedEnvsConfig.${self:provider.stage}.profile}', // Used to point to the right AWS account
    stage: `\${opt:stage, '${defaultEnvironment}'}`, // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    lambdaHashingVersion: '20201221',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: LAMBDAS_NODE_OPTIONS,
    },
    httpApi: {
      id: {
        'Fn::ImportValue': httpApiIdExportName,
      },
    },
  },
  functions,
  custom: {
    projectName,
    sharedEnvsConfig,
    esbuild: esbuildConfig,
  },
  resources: {
    Description: 'Users service: manage users',
  },
};

module.exports = serverlessConfiguration;
