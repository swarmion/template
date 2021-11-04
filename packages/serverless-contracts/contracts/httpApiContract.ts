import { JSONSchema } from 'json-schema-to-ts';

import { HttpMethod } from 'types/http';

interface HttpApiTriggerType {
  httpApi: {
    path: string;
    method: string;
  };
}

interface InputSchemaType<
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

interface FullContractSchemaType<
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

export class HttpApiContract<
  Path extends string,
  Method extends HttpMethod,
  PathParametersSchema extends JSONSchema,
  QueryStringParametersSchema extends JSONSchema,
  HeadersSchema extends JSONSchema,
  BodySchema extends JSONSchema,
  OutputSchema extends JSONSchema,
> {
  private _path: Path;
  private _method: Method;
  private _pathParametersSchema: PathParametersSchema;
  private _queryStringParametersSchema: QueryStringParametersSchema;
  private _headersSchema: HeadersSchema;
  private _bodySchema: BodySchema;
  private _outputSchema: OutputSchema;

  constructor({
    path,
    method,
    pathParametersSchema,
    queryStringParametersSchema,
    headersSchema,
    bodySchema,
    outputSchema,
  }: {
    path: Path;
    method: Method;
    pathParametersSchema: PathParametersSchema;
    queryStringParametersSchema: QueryStringParametersSchema;
    headersSchema: HeadersSchema;
    bodySchema: BodySchema;
    outputSchema: OutputSchema;
  }) {
    this._path = path;
    this._method = method;
    this._pathParametersSchema = pathParametersSchema;
    this._queryStringParametersSchema = queryStringParametersSchema;
    this._headersSchema = headersSchema;
    this._bodySchema = bodySchema;
    this._outputSchema = outputSchema;
  }

  get trigger(): HttpApiTriggerType {
    return { httpApi: { path: this._path, method: this._method } };
  }

  get inputSchema(): InputSchemaType<
    PathParametersSchema,
    QueryStringParametersSchema,
    HeadersSchema,
    BodySchema
  > {
    return {
      type: 'object',
      properties: {
        pathParameters: this._pathParametersSchema,
        queryStringParameters: this._queryStringParametersSchema,
        headers: this._headersSchema,
        body: this._bodySchema,
      },
      required: ['pathParameters', 'queryStringParameters', 'headers', 'body'],
    };
  }

  get ouputSchema(): OutputSchema {
    return this._outputSchema;
  }

  get fullContractSchema(): FullContractSchemaType<
    Path,
    Method,
    PathParametersSchema,
    QueryStringParametersSchema,
    HeadersSchema,
    BodySchema,
    OutputSchema
  > {
    return {
      type: 'object',
      properties: {
        contractType: { const: 'httpApi' },
        path: { const: this._path },
        method: { const: this._method },
        pathParameters: this._pathParametersSchema,
        queryStringParameters: this._queryStringParametersSchema,
        headers: this._headersSchema,
        body: this._bodySchema,
        output: this._outputSchema,
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
    };
  }
}
