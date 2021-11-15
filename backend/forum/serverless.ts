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
  service: `${projectName}-forum`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.61.0',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    '@sls-monorepo/serverless-tag-git-commit-plugin',
    '@sls-monorepo/serverless-contracts-plugin',
  ],
  provider: {
    ...sharedProviderConfig,
    httpApi: {
      id: httpApiResourceContract.importValue,
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
    Description: 'Forum service: handle forum activity, posts and threads',
  },
};

module.exports = serverlessConfiguration;
