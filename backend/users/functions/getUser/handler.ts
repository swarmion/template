import { applyHttpMiddlewares } from '@sls-monorepo/serverless-helpers';
import { FromSchema } from 'json-schema-to-ts';
import { inputSchema } from './schema';

export const handler = async (
  event: FromSchema<typeof inputSchema>,
): Promise<string> => {
  const { userId } = event.pathParameters;

  await Promise.resolve({ userId });

  return 'ok';
};

export const main = applyHttpMiddlewares(handler, { inputSchema });
