import { ApiGatewayContract } from '@serverless-contracts/core';

import { postEntitySchema, threadEntitySchema } from 'schemas/entities';

const pathParametersSchema = {
  type: 'object',
  properties: {
    threadId: { type: 'string' },
  },
  required: ['threadId'],
  additionalProperties: false,
} as const;

const outputSchema = {
  type: 'object',
  properties: {
    thread: threadEntitySchema,
    posts: { type: 'array', items: postEntitySchema },
  },
  required: ['thread', 'posts'],
  additionalProperties: false,
} as const;

export const getThreadWithPostsContract = new ApiGatewayContract({
  path: '/forum/thread/{threadId}',
  method: 'GET',
  integrationType: 'httpApi',
  pathParametersSchema,
  queryStringParametersSchema: undefined,
  bodySchema: undefined,
  headersSchema: undefined,
  outputSchema,
});
