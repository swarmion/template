import { getHandlerPath } from '@sls-monorepo/serverless-helpers';

export default {
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
