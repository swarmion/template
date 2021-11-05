import { JSONSchema } from 'json-schema-to-ts';

export interface HttpApiTriggerType {
  httpApi: {
    path: string;
    method: string;
  };
}

export type AllInputProperties<
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
> = {
  pathParameters: PathParametersSchema;
  queryStringParameters: QueryStringParametersSchema;
  headers: HeadersSchema;
  body: BodySchema;
};

export interface InputSchemaType<
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
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
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
  OutputSchema extends JSONSchema | undefined,
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
