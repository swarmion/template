export interface HttpApiTriggerType {
  httpApi: {
    path: string;
    method: string;
  };
}

export interface InputSchemaType<
  PathParametersSchema,
  QueryStringParametersSchema,
  HeadersSchema,
  BodySchema,
> {
  type: 'object';
  properties: {
    pathParameters: PathParametersSchema;
    queryStringParameters: QueryStringParametersSchema;
    headers: HeadersSchema;
    body: BodySchema;
  };
  required: ['pathParameters', 'queryStringParameters', 'headers', 'body'];
}

export interface FullContractSchemaType<
  Path,
  Method,
  PathParametersSchema,
  QueryStringParametersSchema,
  HeadersSchema,
  BodySchema,
  OutputSchema,
> {
  type: 'object';
  properties: {
    contractType: { const: 'httpApi' };
    path: { const: Path };
    method: { const: Method };
    pathParameters: PathParametersSchema;
    queryStringParameters: QueryStringParametersSchema;
    headers: HeadersSchema;
    body: BodySchema;
    output: OutputSchema;
  };
  required: [
    'contractType',
    'path',
    'method',
    'pathParameters',
    'queryStringParameters',
    'headers',
    'body',
    'output',
  ];
}
