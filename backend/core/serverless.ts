import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@swarmion-starter/core-contracts';
import {
  projectName,
  sharedEsbuildConfig,
  sharedParams,
  sharedProviderConfig,
} from '@swarmion-starter/serverless-configuration';
import { mergeStageParams } from '@swarmion-starter/serverless-helpers';

import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-core`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  configValidationMode: 'error',
  plugins: ['serverless-esbuild'],
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
  params: mergeStageParams(sharedParams, {
    dev: {
      apiGatewayCorsAllowedOrigins: ['http://localhost:3000'],
    },
    staging: {
      apiGatewayCorsAllowedOrigins: ['https://staging.my-domain.com'],
    },
    production: {
      apiGatewayCorsAllowedOrigins: ['https://www.my-domain.com'],
    },
  }),
  custom: {
    projectName,
    esbuild: sharedEsbuildConfig,
  },
  resources: {
    Description: 'Core service',
    Outputs: {
      HttpApiId: httpApiResourceContract.exportValue({
        description: 'The shared httpApi resource (test)',
        value: { Ref: 'HttpApi' },
      }),
      exportedToto: { Value: 'tata' },
    },
  },
};

module.exports = serverlessConfiguration;
