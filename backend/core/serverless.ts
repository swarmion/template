import { AWS } from '@serverless/typescript';

import { CoreCloudFormationKeys } from '@sls-monorepo/core-schemas';
import {
  projectName,
  sharedEnvsConfig,
  sharedEsbuildConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';
import { generateCloudFormationExports } from '@sls-monorepo/serverless-helpers';

import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-core`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.50.0',
  plugins: ['serverless-esbuild'],
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
    Outputs: generateCloudFormationExports<CoreCloudFormationKeys>({
      HttpApiId: { Ref: 'HttpApi' },
    }),
  },
};

module.exports = serverlessConfiguration;
