import { AWS } from '@serverless/typescript';
import { ServerlessContracts } from '@swarmion/serverless-plugin';
import type { Lift } from 'serverless-lift';

import {
  projectName,
  sharedParams,
  sharedProviderConfig,
} from '@swarmion-starter/serverless-configuration';
import { getUserContract } from '@swarmion-starter/users-contracts';

const serverlessConfiguration: AWS & Lift & ServerlessContracts = {
  service: `${projectName}-frontend`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  plugins: ['serverless-lift', '@swarmion/serverless-plugin'],
  provider: sharedProviderConfig,
  params: sharedParams,
  custom: {
    projectName,
  },
  constructs: {
    app: {
      type: 'static-website',
      path: '../app/dist',
    },
  },
  contracts: {
    consumes: {
      getUser: getUserContract.fullContractSchema,
    },
    provides: {},
  },
  resources: {
    Description: 'Frontend cloudfront service',
  },
};

module.exports = serverlessConfiguration;
