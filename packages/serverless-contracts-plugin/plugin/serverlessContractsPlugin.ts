import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';

import { ContractsLocation } from '../types/locations';
import {
  ServerlessContracts,
  serviceOptionsSchema,
} from '../types/serviceOptions';

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

    // add validation schema for options
    serverless.configSchemaHandler.defineTopLevelProperty(
      'contracts',
      serviceOptionsSchema,
    );

    this.commands = {
      localContracts: {
        usage: 'Show local Serverless contracts',
        lifecycleEvents: ['run'],
      },
    };
    this.hooks = {
      'localContracts:run': this.printLocalServerlessContracts.bind(this),
    };
  }

  listLocalContracts(): ServerlessContracts {
    // @ts-ignore mistype in the orignals (the animals)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const { provides, consumes } = this.serverless.service
      .initialServerlessConfig.contracts as ServerlessContracts['contracts'];

    return { contracts: { provides, consumes } };
  }

  printContracts({
    contracts: { provides, consumes },
    contractsLocation,
  }: ServerlessContracts & { contractsLocation: ContractsLocation }): void {
    console.log(
      `--- Serverless contracts for location ${contractsLocation} ---`,
    );
    console.log();
    console.log('-- Provides --');
    console.log();
    console.log(JSON.stringify(provides));
    console.log();
    console.log('-- Consumes --');
    console.log(JSON.stringify(consumes));
  }

  printLocalServerlessContracts(): void {
    const { contracts } = this.listLocalContracts();
    this.printContracts({
      contracts,
      contractsLocation: ContractsLocation.LOCAL,
    });
  }
}
