import { Tree } from '@nrwl/devkit';
import { symlinkSync } from 'fs';
import { join, relative } from 'path';

import { NormalizedSchema } from '../types';

export const symlinkVsCodeConfiguration = (
  tree: Tree,
  options: NormalizedSchema,
): void => {
  const relativePath = relative(
    options.projectRoot,
    join(tree.root, 'commonConfiguration/.vscode'),
  );
  symlinkSync(relativePath, join(options.projectRoot, '.vscode'), 'dir');
};
