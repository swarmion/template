import { ServerlessContracts } from '@serverless-contracts/plugin';
import { AWS } from '@serverless/typescript';

import {
  projectName,
  sharedEnvsConfig,
  sharedEsbuildConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';

import { functions } from './functions';
import { Resources } from './resources';

const serverlessConfiguration: AWS & ServerlessContracts = {
  service: `${projectName}-orchestrator`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.61.0',
  configValidationMode: 'error',
  plugins: ['serverless-esbuild', '@serverless-contracts/plugin'],
  provider: {
    ...sharedProviderConfig,
  },
  functions,
  package: { individually: true },
  custom: {
    projectName,
    sharedEnvsConfig,
    esbuild: sharedEsbuildConfig,
  },
  contracts: {
    provides: {},
    consumes: {},
  },
  resources: {
    Description: 'Monorepo deployments orchestrator',
    Resources,
  },
};

module.exports = serverlessConfiguration;
