import { getThreadWithPostsContract } from '@sls-monorepo/forum-schemas';
import {
  getHandlerPath,
  LambdaFunction,
} from '@sls-monorepo/serverless-helpers';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getThreadWithPostsContract.trigger],
};

export default config;
