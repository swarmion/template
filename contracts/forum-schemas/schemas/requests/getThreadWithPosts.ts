import { FromSchema } from 'json-schema-to-ts';

import { postEntitySchema, threadEntitySchema } from 'schemas/entities';

export const getThreadReponseSchema = {
  type: 'object',
  properties: {
    thread: threadEntitySchema,
    posts: { type: 'array', items: postEntitySchema },
  },
  required: ['thread', 'posts'],
  additionalProperties: false,
} as const;

export type GetThreadReponse = FromSchema<typeof getThreadReponseSchema>;
