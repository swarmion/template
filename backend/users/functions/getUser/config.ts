import {
  getHandlerPath,
  LambdaFunction,
} from '@sls-monorepo/serverless-helpers';
import { getUserContract } from '@sls-monorepo/users-schemas';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [getUserContract.trigger],
};

export default config;
