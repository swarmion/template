import { HttpApiContract } from '@sls-monorepo/serverless-contracts';

import { userEntitySchema } from 'schemas/entities';

const pathParametersSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
  },
  required: ['userId'],
  additionalProperties: false,
} as const;

export const getUserContract = new HttpApiContract({
  path: '/users/{userId}',
  method: 'GET',
  pathParametersSchema,
  queryStringParametersSchema: undefined,
  bodySchema: undefined,
  headersSchema: undefined,
  outputSchema: userEntitySchema,
});
