/* eslint-disable max-lines */
import { AxiosResponse } from 'axios';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

import { ConstrainedJSONSchema } from 'types/constrainedJSONSchema';
import { HttpMethod } from 'types/http';

import { fillPathTemplate } from '../../utils/fillPathTemplate';
import { axiosRequest } from './axiosRequest';
import {
  DefinedProperties,
  FullContractSchemaType,
  HttpApiLambdaTriggerType,
  InputSchemaType,
  RequestParameters,
} from './types';

/**
 * HttpApiContract:
 *
 * a contract used to define a type-safe interaction between AWS Services through an httpApi.
 *
 * Main features:
 * - input and output dynamic validation with JSONSchemas on both end of the contract;
 * - type inference for both input and output;
 * - generation of a contract document that can be checked for breaking changes;
 */
export class HttpApiContract<
  Path extends string,
  Method extends HttpMethod,
  PathParametersSchema extends ConstrainedJSONSchema | undefined,
  QueryStringParametersSchema extends ConstrainedJSONSchema | undefined,
  HeadersSchema extends ConstrainedJSONSchema | undefined,
  BodySchema extends JSONSchema | undefined,
  OutputSchema extends JSONSchema | undefined,
  PathParametersType = PathParametersSchema extends ConstrainedJSONSchema
    ? FromSchema<PathParametersSchema>
    : undefined,
  QueryStringParametersType = QueryStringParametersSchema extends ConstrainedJSONSchema
    ? FromSchema<QueryStringParametersSchema>
    : undefined,
  HeadersType = HeadersSchema extends ConstrainedJSONSchema
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

  /**
   * Builds a new HttpApi contract
   *
   * @param path the path on which the lambda will be triggered
   * @param method the http method
   * @param pathParametersSchema a JSONSchema used to validate the path parameters and infer their types.
   * Please note that the `as const` directive is necessary to properly infer the type from the schema.
   * See https://github.com/ThomasAribart/json-schema-to-ts#fromschema.
   * Also please note that for Typescript reasons, you need to explicitely pass `undefined` if you don't want to use the schema.
   * @param queryStringParametersSchema a JSONSchema used to validate the query parameters and infer their types (Same constraints).
   * @param headersSchema a JSONSchema used to validate the headers and infer their types (Same constraints).
   * @param bodySchema a JSONSchema used to validate the body and infer its type (Same constraints).
   * @param outputSchema a JSONSchema used to validate the output and infer its type (Same constraints).
   */
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

  /**
   * Returns the lambda httpApi trigger
   */
  get trigger(): HttpApiLambdaTriggerType {
    return { httpApi: { path: this._path, method: this._method } };
  }

  /**
   * Returns the aggregated input schema in order to validate the inputs of lambdas.
   *
   * This also enables to infer the type with `json-schema-to-ts`.
   */
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

  /**
   * Returns the aggregated output schema in order to validate the outputs of lambdas.
   *
   * This also enables to infer the type with `json-schema-to-ts`.
   */
  get outputSchema(): OutputSchema {
    return this._outputSchema;
  }

  /**
   * Returns the aggregated contract schema in order to validate the inputs of lambdas.
   *
   * This also enables to infer the type with `json-schema-to-ts`.
   */
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

  /**
   * Build the parameters necessary to call the request on the client-side
   *
   * @param pathParameters its type matches `FromSchema<typeof pathParametersSchema>`
   * @param queryStringParameters its type matches `FromSchema<typeof queryStringParametersSchema>`
   * @param headers its type matches `FromSchema<typeof headersSchema>`
   * @param body its type matches `FromSchema<typeof headersSchema>`
   *
   * @returns the request parameters to be used on the client-side
   */
  getRequestParameters(
    requestArguments: DefinedProperties<{
      pathParameters: PathParametersType;
      queryStringParameters: QueryStringParametersType;
      headers: HeadersType;
      body: BodyType;
    }>,
  ): RequestParameters<BodyType> {
    // TODO improve inner typing here
    const { pathParameters, queryStringParameters, headers, body } =
      requestArguments as {
        pathParameters: Record<string, string>;
        queryStringParameters: Record<string, string>;
        headers: Record<string, string>;
        body: BodyType;
      };

    const path =
      typeof pathParameters !== 'undefined'
        ? fillPathTemplate(this._path, pathParameters)
        : this._path;

    return omitBy(
      {
        method: this._method,
        path,
        body,
        queryStringParameters,
        headers,
      },
      isUndefined,
    ) as RequestParameters<BodyType>;
  }

  /**
   * @param baseUrl the base endpoint of the api
   * @param requestArguments see `getRequestParameters`
   * @returns a promise with the response
   */
  async axiosRequest(
    baseUrl: string,
    requestArguments: DefinedProperties<{
      pathParameters: PathParametersType;
      queryStringParameters: QueryStringParametersType;
      headers: HeadersType;
      body: BodyType;
    }>,
  ): Promise<AxiosResponse<OutputType>> {
    const requestParameters = this.getRequestParameters(requestArguments);

    return await axiosRequest(baseUrl, requestParameters);
  }
}
