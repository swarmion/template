import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';

interface OptionsExtended extends Serverless.Options {
  verbose?: boolean;
}

export class ServerlessContractsPlugin implements Plugin {
  options: OptionsExtended;
  serverless: Serverless;
  hooks: Plugin.Hooks;
  commands: Plugin.Commands;

  constructor(serverless: Serverless, options: OptionsExtended) {
    this.options = options;
    this.serverless = serverless;
    this.commands = {
      serverlessContracts: {
        usage: 'Manage Serverless contracts',
        lifecycleEvents: ['listContracts'],
      },
    };
    this.hooks = {
      'serverlessContracts:listContracts':
        this.listServerlessContracts.bind(this),
    };
  }

  listServerlessContracts(): void {
    console.log('miam');
  }
}
