import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@swarmion-starter/core-contracts';
import {
  frameworkVersion,
  projectName,
  sharedEsbuildConfig,
  sharedParams,
  sharedProviderConfig,
} from '@swarmion-starter/serverless-configuration';

import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-forum`, // Keep it short to have role name below 64
  frameworkVersion,
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
    Description: 'Forum service: handle forum activity, posts and threads',
  },
};

module.exports = serverlessConfiguration;
