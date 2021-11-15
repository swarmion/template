import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@sls-monorepo/core-schemas';
import {
  projectName,
  sharedEnvsConfig,
  sharedEsbuildConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';

import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-core`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.61.0',
  plugins: [
    'serverless-esbuild',
    '@sls-monorepo/serverless-tag-git-commit-plugin',
    '@sls-monorepo/serverless-contracts-plugin',
  ],
  provider: {
    ...sharedProviderConfig,
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
  functions,
  package: { individually: true },
  custom: {
    projectName,
    sharedEnvsConfig,
    esbuild: sharedEsbuildConfig,
  },
  resources: {
    Description: 'Core service',
    Outputs: {
      HttpApiId: httpApiResourceContract.exportValue({
        description: 'The shared httpApi resource',
        value: { Ref: 'HttpApi' },
      }),
    },
  },
};

module.exports = serverlessConfiguration;
