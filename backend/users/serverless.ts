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
  variablesResolutionMode: '20210326',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-plugin-git-variables',
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
