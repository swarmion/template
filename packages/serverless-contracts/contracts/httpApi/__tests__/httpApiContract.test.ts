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

  it('should accept all possible parameters', () => {
    const httpApiContract = new HttpApiContract({
      path: 'coucou',
      method: 'POST',
      pathParametersSchema,
      queryStringParametersSchema,
      headersSchema,
      bodySchema,
      outputSchema,
    });

    expect(httpApiContract.trigger).toEqual({
      httpApi: {
        path: 'coucou',
        method: 'POST',
      },
    });

    expect(httpApiContract.inputSchema).toEqual({
      type: 'object',
      properties: {
        pathParameters: pathParametersSchema,
        queryStringParameters: queryStringParametersSchema,
        headers: headersSchema,
        body: bodySchema,
      },
      required: ['pathParameters', 'queryStringParameters', 'headers', 'body'],
    });

    expect(httpApiContract.outputSchema).toEqual(outputSchema);

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

  it('should accept a subset of those parameters', () => {
    const httpApiContract = new HttpApiContract({
      path: 'coucou',
      method: 'POST',
      pathParametersSchema: undefined,
      queryStringParametersSchema: undefined,
      headersSchema: undefined,
      bodySchema: undefined,
      outputSchema: undefined,
    });

    expect(httpApiContract.outputSchema).toEqual(undefined);

    expect(httpApiContract.inputSchema).toEqual({
      type: 'object',
      properties: {},
      required: [],
    });

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
});
