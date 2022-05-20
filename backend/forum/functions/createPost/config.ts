import { getTrigger } from '@swarmion/serverless-contracts';

import { createPostContract } from '@swarmion-starter/forum-contracts';
import {
  getHandlerPath,
  LambdaFunction,
} from '@swarmion-starter/serverless-helpers';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getTrigger(createPostContract)],
};

export default config;
