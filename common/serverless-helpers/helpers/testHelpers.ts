import { AWS } from '@serverless/typescript';

const MAX_AWS_LAMBDA_NAME_LENGTH = 64;
const LONGEST_STAGE_SUFFIX = '-production-eu-west-1'.length;

export const getFunctionNameMaxLength = (config: AWS): number =>
  MAX_AWS_LAMBDA_NAME_LENGTH -
  (config.service as string).length -
  LONGEST_STAGE_SUFFIX;

export const checkSlsFunctionNamesLength = (
  config: AWS,
  maxLength: number,
): void => {
  if (!config.functions) return;

  Object.keys(config.functions).forEach(functionName => {
    expect(functionName.length).toBeLessThanOrEqual(maxLength);
  });
};
