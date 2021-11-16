import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';

import { ContractsLocation } from '../types/locations';
import {
  RemoteServerlessContracts,
  ServerlessContracts,
  serviceOptionsSchema,
} from '../types/serviceOptions';
import {
  CONTRACTS_VERSION,
  LATEST_DEPLOYED_TIMESTAMP_TAG_NAME,
} from './utils/constants';
import { listLocalContracts } from './utils/listLocalContracts';
import { printContracts } from './utils/printContracts';
import { uploadContracts } from './utils/uploadContracts';

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
      remoteContracts: {
        usage: 'Show currently deployed Serverless contracts',
        lifecycleEvents: ['run'],
      },
    };
    this.hooks = {
      'localContracts:run': this.printLocalServerlessContracts.bind(this),
      'remoteContracts:run': this.printRemoteServerlessContracts.bind(this),
      'before:package:finalize': this.tagStackWithTimestamp.bind(this),
      'after:aws:deploy:deploy:uploadArtifacts':
        this.uploadContracts.bind(this),
    };
  }

  listLocalContracts(): ServerlessContracts {
    return listLocalContracts(this.serverless);
  }

  printLocalServerlessContracts(): void {
    const contracts = this.listLocalContracts();
    printContracts(contracts, ContractsLocation.LOCAL);
  }

  async printRemoteServerlessContracts(): Promise<void> {
    const contracts = await this.listRemoteContracts();
    printContracts(contracts, ContractsLocation.REMOTE);
  }

  async listRemoteContracts(): Promise<RemoteServerlessContracts> {
    await Promise.resolve();

    return {
      provides: {},
      consumes: {},
      gitCommit: '',
      contractsVersion: CONTRACTS_VERSION,
    };
  }

  tagStackWithTimestamp(): void {
    const artifactDirectoryName = this.serverless.service.package
      .artifactDirectoryName as string;

    // format is serverless/{service}/{stage}/{timestamp}
    const [, , , timestamp] = artifactDirectoryName.split('/');

    this.serverless.service.provider.stackTags = {
      ...this.serverless.service.provider.stackTags,
      [LATEST_DEPLOYED_TIMESTAMP_TAG_NAME]: timestamp,
    };
  }

  async uploadContracts(): Promise<void> {
    await uploadContracts(this.serverless);
  }
}
