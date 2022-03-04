import { getThreadWithPostsContract } from '@swarmion-starter/forum-contracts';
import {
  getHandlerPath,
  LambdaFunction,
} from '@swarmion-starter/serverless-helpers';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getThreadWithPostsContract.trigger],
};

export default config;
