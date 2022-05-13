import { getInputSchema, HandlerType } from '@swarmion/serverless-contracts';

import { applyHttpMiddlewares } from '@swarmion-starter/serverless-helpers';
import { getUserContract } from '@swarmion-starter/users-contracts';

export const handler: HandlerType<typeof getUserContract> = async event => {
  const { userId } = event.pathParameters;

  await Promise.resolve({ userId });

  return { userId, userName: 'hello_world' };
};

export const main = applyHttpMiddlewares(handler, {
  inputSchema: getInputSchema(getUserContract),
  outputSchema: getUserContract.outputSchema,
});
