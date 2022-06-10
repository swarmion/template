import { handler } from './handler';

describe('createPost handler', () => {
  it('should return a post with the created content', async () => {
    const postContent = 'Hello from Swarmion';

    const { content } = await handler({
      pathParameters: { threadId: 'blob' },
      body: { content: postContent },
      // @ts-expect-error we don't want to define a full context here
      requestContext: {},
    });

    expect(content).toEqual(postContent);
  });
});
