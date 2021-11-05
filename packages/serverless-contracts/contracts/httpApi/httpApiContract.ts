import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

import { HttpMethod } from 'types/http';
import { fillPathTemplate } from 'utils/fillPathTemplate';

import {
  FullContractSchemaType,
  HttpApiTriggerType,
  InputSchemaType,
} from './types';

export class HttpApiContract<
  Path extends string,
  Method extends HttpMethod,
  PathParametersSchema extends JSONSchema | undefined,
  QueryStringParametersSchema extends JSONSchema | undefined,
  HeadersSchema extends JSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
  OutputSchema extends JSONSchema | undefined,
  PathParametersType = PathParametersSchema extends JSONSchema
    ? FromSchema<PathParametersSchema>
    : undefined,
  QueryStringParametersType = QueryStringParametersSchema extends JSONSchema
    ? FromSchema<QueryStringParametersSchema>
    : undefined,
  HeadersType = HeadersSchema extends JSONSchema
    ? FromSchema<HeadersSchema>
    : undefined,
  BodyType = BodySchema extends JSONSchema ? FromSchema<BodySchema> : undefined,
  OutputType = OutputSchema extends JSONSchema
    ? FromSchema<OutputSchema>
    : undefined,
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
    const properties = omitBy(
      {
        pathParameters: this._pathParametersSchema,
        queryStringParameters: this._queryStringParametersSchema,
        headers: this._headersSchema,
        body: this._bodySchema,
      } as const,
      isUndefined,
    );

    return {
      type: 'object',
      properties,
      // @ts-ignore here object.keys is not precise enough
      required: Object.keys(properties),
    };
  }

  get outputSchema(): OutputSchema {
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
    const properties = {
      contractType: { const: 'httpApi' },
      path: { const: this._path },
      method: { const: this._method },
      ...omitBy(
        {
          pathParameters: this._pathParametersSchema,
          queryStringParameters: this._queryStringParametersSchema,
          headers: this._headersSchema,
          body: this._bodySchema,
          output: this._outputSchema,
        },
        isUndefined,
      ),
    };

    return {
      type: 'object',
      // @ts-ignore type inference does not work here
      properties,
      // @ts-ignore type inference does not work here
      required: Object.keys(properties),
    };
  }

  async request({
    pathParameters,
    queryStringParameters,
    headers,
    body,
  }: Partial<{
    pathParameters: PathParametersType;
    queryStringParameters: QueryStringParametersType;
    headers: HeadersType;
    body: BodyType;
  }>): Promise<OutputType> {
    await Promise.resolve();
    console.log({
      pathParameters,
      queryStringParameters,
      headers,
      body,
    });

    const path =
      typeof pathParameters !== 'undefined'
        ? fillPathTemplate(
            this._path,
            pathParameters as unknown as Record<string, string>,
          )
        : this._path;

    console.log(path);

    // @ts-ignore it is not the responsibility of the request function to implement the validation
    return {};
  }
}
