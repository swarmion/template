import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';

import { generateFunctionRoleName } from './helpers';

export class ServerlessBetterIamRolesPerFunctionPlugin implements Plugin {
  serverless: Serverless;
  options: Serverless.Options;
  hooks: Plugin.Hooks;

  constructor(serverless: Serverless, options: Serverless.Options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {};

    this.setFunctionsIamRoleStatementsName.bind(this)();
  }

  setFunctionsIamRoleStatementsName(): void {
    const functionNames = this.serverless.service.getAllFunctions();

    for (const functionName of functionNames) {
      const functionObject = this.serverless.service.getFunction(functionName);

      // @ts-expect-error serverless is badly typed 😢
      if (functionObject.iamRoleStatementsName !== undefined) {
        return;
      }

      if (this.serverless.service.service === null) {
        return;
      }

      // @ts-expect-error serverless is badly typed 😢
      functionObject.iamRoleStatementsName = generateFunctionRoleName({
        functionName,
        region: this.serverless.service.provider.region,
        service: this.serverless.service.service,
        stage: this.serverless.service.provider.stage,
      });
    }
  }
}
