import * as crypto from 'crypto';

interface Params {
  functionName: string;
  stage: string;
  service: string;
  region: string;
}

const MAX_AWS_LAMBDA_NAME_LENGTH = 64;
const HASH_LENGTH = 8;

const generateFunctionRoleName = ({
  functionName,
  stage,
  service,
  region,
}: Params): string => {
  const completeFunctionRoleName = `${service}-${functionName}-${stage}-${region}`;

  if (completeFunctionRoleName.length <= MAX_AWS_LAMBDA_NAME_LENGTH) {
    return completeFunctionRoleName;
  }

  const hashedName = crypto
    .createHash('md5')
    .update(completeFunctionRoleName)
    .digest('hex')
    .slice(0, HASH_LENGTH);

  return (
    completeFunctionRoleName.slice(
      0,
      MAX_AWS_LAMBDA_NAME_LENGTH - HASH_LENGTH,
    ) + hashedName
  );
};

export default generateFunctionRoleName;
