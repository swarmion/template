import {
  getHandlerPath,
  LambdaFunction,
} from '@sls-monorepo/serverless-helpers';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/health',
      },
    },
  ],
};

export default config;
