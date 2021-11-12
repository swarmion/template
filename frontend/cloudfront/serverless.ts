import { AWS } from '@serverless/typescript';
import type { Lift } from 'serverless-lift';

import {
  projectName,
  sharedEnvsConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';

const serverlessConfiguration: AWS & Lift = {
  service: `${projectName}-frontend`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.50.0',
  plugins: ['serverless-lift'],
  provider: sharedProviderConfig,
  custom: {
    projectName,
    sharedEnvsConfig,
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
