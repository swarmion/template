/* eslint-disable max-lines */
import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import { join } from 'path';

import { normalizeOptions, packageGenerator } from '../helpers';
import { symlinkVsCodeConfiguration } from '../helpers/symlink';
import { Schema } from '../types';

const SOURCE_FOLDER = './files';

export default async (tree: Tree, schema: Schema): Promise<() => void> => {
  const options = normalizeOptions(tree, schema);

  packageGenerator(tree, options, join(__dirname, SOURCE_FOLDER));
  await formatFiles(tree);

  return () => {
    symlinkVsCodeConfiguration(tree, options);
    installPackagesTask(tree, true);
  };
};
