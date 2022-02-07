import { ServerlessContracts } from '@serverless-contracts/plugin';
import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@sls-monorepo/core-contracts';
import {
  profiles,
  projectName,
  sharedEsbuildConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';

import { functions } from './functions';

const serverlessConfiguration: AWS & ServerlessContracts = {
  service: `${projectName}-core`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  configValidationMode: 'error',
  plugins: ['serverless-esbuild', '@serverless-contracts/plugin'],
  provider: {
    ...sharedProviderConfig,
    httpApi: {
      payload: '2.0',
      cors: {
        // @ts-ignore we use a configuration per environment so we put it as a serverless variable
        allowedOrigins: '${param:apiGatewayCorsAllowedOrigins}',
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
        allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowCredentials: true,
      },
      metrics: true,
    },
  },
  functions,
  package: { individually: true },
  params: {
    dev: {
      apiGatewayCorsAllowedOrigins: ['http://localhost:3000'],
    },
    staging: {
      apiGatewayCorsAllowedOrigins: ['https://staging.my-domain.com'],
    },
    production: {
      apiGatewayCorsAllowedOrigins: ['https://www.my-domain.com'],
    },
  },
  custom: {
    projectName,
    profiles,
    esbuild: sharedEsbuildConfig,
  },
  contracts: {
    provides: {
      httpApiResourceContract: httpApiResourceContract.fullContractSchema,
    },
    consumes: {},
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
