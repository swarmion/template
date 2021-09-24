import middy from '@middy/core';
import { Handler } from 'aws-lambda';
import jsonValidator from '@middy/validator';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

import { JSONSchema } from 'json-schema-to-ts';

interface Options {
  inputSchema?: JSONSchema;
  outputSchema?: JSONSchema;
}

export const applyHttpMiddlewares = <Event, Result>(
  handler: Handler<Event, Result>,
  { inputSchema }: Options,
): middy.MiddyfiedHandler<Event, Result> => {
  const middyfiedHandler = middy(handler);

  if (inputSchema !== undefined) {
    middyfiedHandler.use(jsonBodyParser());
    middyfiedHandler.use(jsonValidator({ inputSchema }));
  }

  middyfiedHandler.use(httpErrorHandler());

  return middyfiedHandler;
};
