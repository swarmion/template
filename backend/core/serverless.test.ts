import { AWS } from '@serverless/typescript';

import {
  checkSlsFunctionNamesLength,
  getFunctionNameMaxLength,
} from '@sls-monorepo/serverless-helpers';

import * as sc from './serverless';

const serverlessConfiguration = sc as AWS;

/**
 * serverless tests
 *
 * @group unit/serverless
 */
describe('root service serverless.ts', () => {
  const FUNCTION_NAME_MAX_LENGTH = getFunctionNameMaxLength(
    serverlessConfiguration,
  );

  it(`has functions with names less than or equal to ${FUNCTION_NAME_MAX_LENGTH} chars`, () => {
    checkSlsFunctionNamesLength(
      serverlessConfiguration,
      FUNCTION_NAME_MAX_LENGTH,
    );
  });
});
