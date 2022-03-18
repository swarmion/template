import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  writeJson,
  getWorkspaceLayout,
} from '@nrwl/devkit';

import generator from './index';
import { Schema } from '../types';

describe('packages-generator generator', () => {
  let appTree: Tree;
  const options: Schema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    writeJson(
      appTree,
      `${getWorkspaceLayout(appTree).npmScope}.code-workspace`,
      { folders: [] },
    );
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'backend-test');
    expect(config).toBeDefined();
  });
});
