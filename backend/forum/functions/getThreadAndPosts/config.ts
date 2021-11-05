import { getThreadWithPostsContract } from '@sls-monorepo/forum-schemas';
import { getHandlerPath } from '@sls-monorepo/serverless-helpers';

export default {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getThreadWithPostsContract.trigger],
};
