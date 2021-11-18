import generateFunctionRoleName from '../generateFunctionRoleName';

const MAX_AWS_LAMBDA_NAME_LENGTH = 64;

describe('generateFunctionRoleName', () => {
  it('should return complete function role name if function is short enough', () => {
    const functionName = 'myFunction';

    const stage = 'production';
    const service = 'project-service';
    const region = 'eu-west-1';

    expect(
      generateFunctionRoleName({ functionName, stage, service, region }),
    ).toBe('project-service-myFunction-production-eu-west-1');
  });

  it('should return truncated function role name if function name is too long', () => {
    const functionName = 'myReallyLongLongFunctionName';

    const stage = 'production';
    const service = 'project-service';
    const region = 'eu-west-1';

    expect(
      generateFunctionRoleName({ functionName, stage, service, region }).length,
    ).toBeLessThanOrEqual(MAX_AWS_LAMBDA_NAME_LENGTH);
  });

  it('should return the same name every time if the function name is too long', () => {
    const functionName = 'myReallyLongLongFunctionName';

    const stage = 'production';
    const service = 'project-service';
    const region = 'eu-west-1';

    const firstRoleName = generateFunctionRoleName({
      functionName,
      stage,
      service,
      region,
    });
    const secondRoleName = generateFunctionRoleName({
      functionName,
      stage,
      service,
      region,
    });

    expect(firstRoleName).toBe(secondRoleName);
  });

  it('should return different name when truncated name are the same', () => {
    const firstFunctionName =
      'myReallyLongLongFunctionNamemyReallyLongLongFunctionNamemyReallyLongLongFunctionNamemyReallyLongLongFunctionNameFirst';
    const secondFunctionName =
      'myReallyLongLongFunctionNamemyReallyLongLongFunctionNamemyReallyLongLongFunctionNamemyReallyLongLongFunctionNameSecond';

    const stage = 'production';
    const service = 'project-service';
    const region = 'eu-west-1';

    const firstRoleName = generateFunctionRoleName({
      functionName: firstFunctionName,
      stage,
      service,
      region,
    });
    const secondRoleName = generateFunctionRoleName({
      functionName: secondFunctionName,
      stage,
      service,
      region,
    });

    expect(firstRoleName).not.toBe(secondRoleName);
  });
});
