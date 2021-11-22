import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';

import { DeploymentTypes } from '../types/deploymentTypes';
import { ContractsLocation } from '../types/locations';
import {
  RemoteServerlessContracts,
  ServerlessContracts,
  serviceOptionsSchema,
} from '../types/serviceOptions';
import { getTimestampFromArtifactDirectoryName } from './utils/artifactDirectory';
import { LATEST_DEPLOYED_TIMESTAMP_TAG_NAME } from './utils/constants';
import { listLocalContracts } from './utils/listLocalContracts';
import { listRemoteContracts } from './utils/listRemoteContracts';
import { printContracts } from './utils/printContracts';
import { uploadContracts } from './utils/uploadContracts';
import { validateDeployment } from './utils/validateDeployment';

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
      'before:deploy:deploy': this.validateDeployment.bind(this),
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
    if (contracts === undefined) {
      this.serverless.cli.log(
        'Unable to retrieve remote contracts',
        'Contracts',
      );

      return;
    }
    printContracts(contracts, ContractsLocation.REMOTE);
  }

  async listRemoteContracts(): Promise<RemoteServerlessContracts | undefined> {
    return listRemoteContracts(this.serverless);
  }

  tagStackWithTimestamp(): void {
    const artifactDirectoryName = this.serverless.service.package
      .artifactDirectoryName as string;

    const timestamp = getTimestampFromArtifactDirectoryName(
      artifactDirectoryName,
    );

    this.serverless.service.provider.stackTags = {
      ...this.serverless.service.provider.stackTags,
      [LATEST_DEPLOYED_TIMESTAMP_TAG_NAME]: timestamp,
    };
  }

  async uploadContracts(): Promise<void> {
    await uploadContracts(this.serverless);
  }

  async validateDeployment(): Promise<void> {
    const localContracts = listLocalContracts(this.serverless);
    const remoteContracts = await listRemoteContracts(this.serverless);
    if (remoteContracts === undefined) {
      this.serverless.cli.log(
        'Unable to retrieve remote contracts, deployment is unsafe',
        'Contracts',
      );

      return;
    }

    this.serverless.cli.log('Validating contracts...', 'Contracts');

    await validateDeployment(
      localContracts,
      remoteContracts,
      DeploymentTypes.PROVIDER_FIRST,
    );
  }
}
