import { ApiGatewayContract } from '@swarmion/serverless-contracts';

import { postEntitySchema } from 'contracts/entities';

const pathParametersSchema = {
  type: 'object',
  properties: {
    threadId: { type: 'string' },
  },
  required: ['threadId'],
  additionalProperties: false,
} as const;

const bodySchema = {
  type: 'object',
  properties: {
    content: { type: 'string' },
  },
  required: ['content'],
  additionalProperties: false,
} as const;

export const createPostContract = new ApiGatewayContract({
  id: 'forum-createPost',
  path: '/forum/thread/{threadId}',
  method: 'POST',
  integrationType: 'httpApi',
  pathParametersSchema,
  queryStringParametersSchema: undefined,
  bodySchema,
  headersSchema: undefined,
  outputSchema: postEntitySchema,
});
