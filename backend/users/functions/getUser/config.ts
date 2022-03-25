import {
  getHandlerPath,
  LambdaFunction,
} from '@swarmion-starter/serverless-helpers';
import { getUserContract } from '@swarmion-starter/users-contracts';

const config: LambdaFunction = {
  environment: {
    INJECTED_TOTO: '${param:toto}',
    INJECTED_BLABLA: '${param:blabla}',
  },
  handler: getHandlerPath(__dirname),
  events: [getUserContract.trigger],
};

export default config;
