import { getHandlerPath } from '@sls-monorepo/serverless-helpers';
import { getUserContract } from '@sls-monorepo/users-schemas';

export default {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getUserContract.trigger],
};
