export const inputSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        threadId: { type: 'string' },
      },
      required: ['threadId'],
      additionalProperties: false,
    },
  },
  required: ['pathParameters'],
} as const;
