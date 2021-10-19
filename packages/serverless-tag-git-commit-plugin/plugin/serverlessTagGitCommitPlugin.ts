import * as AWS from 'aws-sdk';
import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';
import simpleGit from 'simple-git';

interface OptionsExtended extends Serverless.Options {
  verbose?: boolean;
}

const TAG_NAME = 'GIT_COMMIT_HASH';

export class ServerlessTagGitCommitPlugin implements Plugin {
  options: OptionsExtended;
  serverless: Serverless;
  hooks: Plugin.Hooks;
  commands: Plugin.Commands;

  constructor(serverless: Serverless, options: OptionsExtended) {
    this.options = options;
    this.serverless = serverless;
    this.commands = {
      deployedVersion: {
        usage: 'Get the git commit hash of the deployed version of the stack',
        lifecycleEvents: ['describeStack'],
      },
    };
    this.hooks = {
      'after:package:initialize': this.tagStackWithGitCommit.bind(this),
      'deployedVersion:describeStack': this.getDeployedGitCommitHash.bind(this),
    };
  }

  async tagStackWithGitCommit(): Promise<void> {
    const git = simpleGit();

    const hash = await git.revparse('HEAD');

    // @ts-ignore outdated in @types/serverless
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.serverless.service.provider.stackTags = {
      // @ts-ignore outdated in @types/serverless
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...this.serverless.service.provider.stackTags,
      [TAG_NAME]: hash,
    };
  }

  async getDeployedGitCommitHash(): Promise<void> {
    const provider = this.serverless.getProvider('aws');

    const stackName = provider.naming.getStackName();

    const { Stacks } = (await provider.request(
      'CloudFormation',
      'describeStacks',
      {
        StackName: stackName,
      },
    )) as AWS.CloudFormation.DescribeStacksOutput;

    if (Stacks !== undefined) {
      console.log(Stacks[0].Tags?.find(({ Key }) => Key === TAG_NAME)?.Value);
    }
  }
}
