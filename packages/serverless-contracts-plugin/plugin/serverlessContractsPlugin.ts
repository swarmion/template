import crypto from 'crypto';
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
      'after:aws:deploy:deploy:uploadArtifacts':
        this.uploadContracts.bind(this),
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

  async uploadContracts(): Promise<void> {
    // @ts-ignore @types/serverless does not know this prop
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this.serverless.service.provider.shouldNotDeploy) {
      this.serverless.cli.log(
        'Service files not changed. Skipping contracts upload...',
        'Contracts',
        { color: 'orange' },
      );
    }
    const provider = this.serverless.getProvider('aws');
    const bucketName = await provider.getServerlessDeploymentBucketName();
    const artifactDirectoryName = this.serverless.service.package
      .artifactDirectoryName as string;

    const { contracts } = this.listLocalContracts();

    const fileHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(contracts))
      .digest('base64');

    const compiledContractsFileName = 'compiled-serverless-contracts.json';

    const params = {
      Bucket: bucketName,
      Key: `${artifactDirectoryName}/${compiledContractsFileName}`,
      Body: JSON.stringify(contracts),
      ContentType: 'application/json',
      Metadata: {
        filesha256: fileHash,
      },
    };

    this.serverless.cli.log('Uploading contracts file to S3...', 'Contracts');

    await provider.request('S3', 'upload', params);
  }
}
