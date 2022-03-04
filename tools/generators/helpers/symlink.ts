import { Tree } from '@nrwl/devkit';
import { symlinkSync } from 'fs';
import { join } from 'path';

import { NormalizedSchema } from '../types';

export const symlinkVsCodeConfiguration = (
  tree: Tree,
  options: NormalizedSchema,
): void => {
  symlinkSync(
    join(tree.root, 'commonConfiguration/.vscode'),
    join(options.projectRoot, '.vscode'),
    'dir',
  );
};
