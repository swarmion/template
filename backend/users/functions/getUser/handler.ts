import { applyHttpMiddlewares } from '@sls-monorepo/serverless-helpers';
import { FromSchema } from 'json-schema-to-ts';
import { UserEntity } from '@sls-monorepo/users-schemas';
import { inputSchema } from './schema';

export const handler = async (
  event: FromSchema<typeof inputSchema>,
): Promise<UserEntity> => {
  const { userId } = event.pathParameters;

  await Promise.resolve({ userId });

  return { userId, userName: 'hello_world' };
};

export const main = applyHttpMiddlewares(handler, { inputSchema });
