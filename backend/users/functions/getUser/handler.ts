import { FromSchema } from 'json-schema-to-ts';

import { applyHttpMiddlewares } from '@sls-monorepo/serverless-helpers';
import { getUserContract } from '@sls-monorepo/users-contracts';

export const handler = async (
  event: FromSchema<typeof getUserContract.inputSchema>,
): Promise<FromSchema<typeof getUserContract.outputSchema>> => {
  const { userId } = event.pathParameters;

  await Promise.resolve({ userId });

  return { userId, userName: 'hello_world' };
};

export const main = applyHttpMiddlewares(handler, {
  inputSchema: getUserContract.inputSchema,
  outputSchema: getUserContract.outputSchema,
});
