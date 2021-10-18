import { AWS } from '@serverless/typescript';

import {
  httpApiIdExportName,
  projectName,
  sharedEnvsConfig,
  sharedEsbuildConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';

import { functions } from './functions';

const serverlessConfiguration: AWS = {
  service: `${projectName}-users`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.61.0',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    '@sls-monorepo/serverless-plugin-commit-tag',
  ],
  provider: {
    ...sharedProviderConfig,
    httpApi: {
      id: {
        'Fn::ImportValue': httpApiIdExportName,
      },
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
    Description: 'Users service: manage users',
  },
};

module.exports = serverlessConfiguration;
