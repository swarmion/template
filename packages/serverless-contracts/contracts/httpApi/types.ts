import { JSONSchema } from 'json-schema-to-ts';

export interface HttpApiTriggerType {
  httpApi: {
    path: string;
    method: string;
  };
}

type DefinedProperties<Type> = {
  [Property in keyof Type as Type[Property] extends undefined
    ? never
    : Property]: Type[Property];
};

type AllInputProperties<
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

type AllFullContractProperties<
  Path,
  Method,
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
  OutputSchema extends JSONSchema | undefined,
> = {
  contractType: { const: 'httpApi' };
  path: { const: Path };
  method: { const: Method };
  pathParameters: PathParametersSchema;
  queryStringParameters: QueryStringParametersSchema;
  headers: HeadersSchema;
  body: BodySchema;
  output: OutputSchema;
};

export type InputSchemaType<
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
  DefinedInputProperties = DefinedProperties<
    AllInputProperties<
      PathParametersSchema,
      QueryStringParametersSchema,
      HeadersSchema,
      BodySchema
    >
  >,
> = {
  type: 'object';
  properties: DefinedInputProperties;
  required: Array<keyof DefinedInputProperties>;
};

export interface FullContractSchemaType<
  Path,
  Method,
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
  OutputSchema extends JSONSchema | undefined,
  DefinedFullContractProperties = DefinedProperties<
    AllFullContractProperties<
      Path,
      Method,
      PathParametersSchema,
      QueryStringParametersSchema,
      HeadersSchema,
      BodySchema,
      OutputSchema
    >
  >,
> {
  type: 'object';
  properties: DefinedFullContractProperties;
  required: Array<keyof DefinedFullContractProperties>;
}
