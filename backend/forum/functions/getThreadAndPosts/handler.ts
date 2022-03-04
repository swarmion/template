import { getThreadWithPostsContract } from '@swarmion-starter/forum-contracts';
import { applyHttpMiddlewares } from '@swarmion-starter/serverless-helpers';

export const handler = getThreadWithPostsContract.handler(async event => {
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
});

export const main = applyHttpMiddlewares(handler, {
  inputSchema: getThreadWithPostsContract.inputSchema,
});
