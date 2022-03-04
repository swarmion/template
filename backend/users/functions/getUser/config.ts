import {
  getHandlerPath,
  LambdaFunction,
} from '@swarmion-starter/serverless-helpers';
import { getUserContract } from '@swarmion-starter/users-contracts';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getUserContract.trigger],
};

export default config;
