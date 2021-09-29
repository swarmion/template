import {
  defaultEnvironment,
  LAMBDAS_NODE_OPTIONS,
  projectName,
  sharedEnvsConfig,
} from '@sls-monorepo/serverless-configuration';
import { AWS } from '@serverless/typescript';

import { HttpApiId } from './resources/apiGateway';

const serverlessConfiguration: AWS = {
  service: `${projectName}-core`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.50.0',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-3',
    profile: '${self:custom.sharedEnvsConfig.${self:provider.stage}.profile}', // Used to point to the right AWS account
    stage: `\${opt:stage, '${defaultEnvironment}'}`, // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    lambdaHashingVersion: '20201221',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: LAMBDAS_NODE_OPTIONS,
    },
    httpApi: {
      payload: '2.0',
      cors: {
        // @ts-ignore we use a configuration per environment so we put it as a serverless variable
        allowedOrigins:
          '${self:custom.sharedEnvsConfig.${self:provider.stage}.apiGatewayCorsAllowedOrigins}',
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
        allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowCredentials: true,
      },
      metrics: true,
    },
  },
  custom: {
    projectName,
    sharedEnvsConfig,
  },
  resources: {
    Description: 'Core service',
    Outputs: {
      HttpApiId,
    },
  },
};

module.exports = serverlessConfiguration;
