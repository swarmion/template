import * as Serverless from 'serverless';
import * as Plugin from 'serverless/classes/Plugin';
import simpleGit from 'simple-git';

interface OptionsExtended extends Serverless.Options {
  verbose?: boolean;
}

const TAG_NAME = 'GIT_COMMIT_HASH';

export class ServerlessCommitTagPlugin implements Plugin {
  options: OptionsExtended;
  serverless: Serverless;
  hooks: Plugin.Hooks;
  commands: Plugin.Commands;

  constructor(serverless: Serverless, options: OptionsExtended) {
    this.options = options;
    this.serverless = serverless;
    this.commands = {};
    this.hooks = {
      'after:package:initialize': this.exportGitCommitHash.bind(this),
    };
  }

  async exportGitCommitHash(): Promise<void> {
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
}
