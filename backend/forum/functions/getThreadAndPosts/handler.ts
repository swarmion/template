import { FromSchema } from 'json-schema-to-ts';

import { getThreadWithPostsContract } from '@sls-monorepo/forum-contracts';
import { applyHttpMiddlewares } from '@sls-monorepo/serverless-helpers';

export const handler = async (
  event: FromSchema<typeof getThreadWithPostsContract.inputSchema>,
): Promise<FromSchema<typeof getThreadWithPostsContract.outputSchema>> => {
  const { threadId } = event.pathParameters;

  await Promise.resolve({ threadId });

  return {
    thread: {
      id: threadId,
      name: 'My thread!',
      createdAt: '2021-10-25T12:12:00Z',
      editedAt: null,
    },
    posts: [
      {
        id: 'myFirstPost',
        createdAt: '2021-10-25T12:12:00Z',
        editedAt: null,
        content: 'Hello from my super forum!',
        authorId: 'author1',
      },
      {
        id: 'myFirstPost',

        createdAt: '2021-10-25T12:12:00Z',
        editedAt: null,
        content: 'Wow this is cool',
        authorId: 'author2',
      },
    ],
  };
};

export const main = applyHttpMiddlewares(handler, {
  inputSchema: getThreadWithPostsContract.inputSchema,
});
