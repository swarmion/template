import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@swarmion-starter/core-contracts';
import {
  projectName,
  sharedEsbuildConfig,
  sharedParams,
  sharedProviderConfig,
} from '@swarmion-starter/serverless-configuration';

import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-users`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  configValidationMode: 'error',
  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
  provider: {
    ...sharedProviderConfig,
    httpApi: {
      id: httpApiResourceContract.importValue,
    },
  },
  params: sharedParams,
  functions,
  package: { individually: true },
  custom: {
    projectName,
    esbuild: sharedEsbuildConfig,
  },
  resources: {
    Description: 'Users service: manage users (test)',
  },
};

module.exports = serverlessConfiguration;
