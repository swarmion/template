import { HttpApiContract } from '../httpApiContract';

describe('httpApiContract', () => {
  const pathParametersSchema = {
    type: 'object',
    properties: { userId: { type: 'string' } },
    required: ['userId'],
  } as const;

  const queryStringParametersSchema = {
    type: 'object',
    properties: { testId: { type: 'string' } },
    required: ['testId'],
  } as const;

  const headersSchema = {
    type: 'object',
    properties: { myHeader: { type: 'string' } },
    required: ['myHeader'],
  } as const;

  const bodySchema = {
    type: 'object',
    properties: { foo: { type: 'string' } },
    required: ['foo'],
  } as const;

  const outputSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  } as const;

  describe('when all parameters are set', () => {
    const httpApiContract = new HttpApiContract({
      path: 'coucou',
      method: 'POST',
      pathParametersSchema,
      queryStringParametersSchema,
      headersSchema,
      bodySchema,
      outputSchema,
    });

    it('should have the correct trigger', () => {
      expect(httpApiContract.trigger).toEqual({
        httpApi: {
          path: 'coucou',
          method: 'POST',
        },
      });
    });

    it('should have the correct inputSchema', () => {
      expect(httpApiContract.inputSchema).toEqual({
        type: 'object',
        properties: {
          pathParameters: pathParametersSchema,
          queryStringParameters: queryStringParametersSchema,
          headers: headersSchema,
          body: bodySchema,
        },
        required: [
          'pathParameters',
          'queryStringParameters',
          'headers',
          'body',
        ],
      });
    });

    it('should have the correct outputSchema', () => {
      expect(httpApiContract.outputSchema).toEqual(outputSchema);
    });

    it('should have the correct fullContractSchema', () => {
      expect(httpApiContract.fullContractSchema).toEqual({
        type: 'object',
        properties: {
          contractType: { const: 'httpApi' },
          path: { const: 'coucou' },
          method: { const: 'POST' },
          pathParameters: pathParametersSchema,
          queryStringParameters: queryStringParametersSchema,
          headers: headersSchema,
          body: bodySchema,
          output: outputSchema,
        },
        required: [
          'contractType',
          'path',
          'method',
          'pathParameters',
          'queryStringParameters',
          'headers',
          'body',
          'output',
        ],
      });
    });

    it('should be requestable with the correct parameters', async () => {
      await httpApiContract.request({ pathParameters: { userId: '123' } });
    });
  });

  describe('when it is instanciated with a subset of schemas', () => {
    const httpApiContract = new HttpApiContract({
      path: 'coucou',
      method: 'POST',
      pathParametersSchema: undefined,
      queryStringParametersSchema: undefined,
      headersSchema: undefined,
      bodySchema: undefined,
      outputSchema: undefined,
    });

    it('should should have the correct outputSchema', () => {
      expect(httpApiContract.outputSchema).toEqual(undefined);
    });

    it('should should have the correct inputSchema', () => {
      expect(httpApiContract.inputSchema).toEqual({
        type: 'object',
        properties: {},
        required: [],
      });
    });

    it('should have the correct fullContractSchema', () => {
      expect(httpApiContract.fullContractSchema).toEqual({
        type: 'object',
        properties: {
          contractType: { const: 'httpApi' },
          path: { const: 'coucou' },
          method: { const: 'POST' },
        },
        required: ['contractType', 'path', 'method'],
      });
    });

    it('should be requestable with no parameters', async () => {
      await httpApiContract.request({});
    });
  });
});
