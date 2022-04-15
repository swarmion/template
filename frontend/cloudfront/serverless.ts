import { AWS } from '@serverless/typescript';
import type { Lift } from 'serverless-lift';

import {
  frameworkVersion,
  projectName,
  sharedParams,
  sharedProviderConfig,
} from '@swarmion-starter/serverless-configuration';

const serverlessConfiguration: AWS & Lift = {
  service: `${projectName}-frontend`, // Keep it short to have role name below 64
  frameworkVersion,
  plugins: ['serverless-lift'],
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
  resources: {
    Description: 'Frontend cloudfront service',
  },
};

module.exports = serverlessConfiguration;
