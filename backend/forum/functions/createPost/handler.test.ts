import { handler } from './handler';

describe('createPost handler', () => {
  it('should return a post with the created content', async () => {
    const postContent = 'Hello from Swarmion';

    const { content } = await handler({
      pathParameters: { threadId: 'blob' },
      body: { content: postContent },
    });

    expect(content).toEqual(postContent);
  });
});
