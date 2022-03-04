import { addProjectConfiguration, Tree, writeJson } from '@nrwl/devkit';
import { join } from 'path';

import { NormalizedSchema } from '../types';
import { createFiles } from './createFiles';
import {
  packageJson,
  packageProjectJson,
  packageTsConfig,
} from './typed-json-config';
import { updateCodeWorkspace } from './updateCodeWorkspace';

const addProject = (tree: Tree, options: NormalizedSchema) => {
  const projectConfiguration = packageProjectJson(options.projectRoot);

  addProjectConfiguration(tree, options.name, projectConfiguration);
};

export const packageGenerator = (
  tree: Tree,
  options: NormalizedSchema,
  sourcePath: string,
): void => {
  createFiles(tree, options, sourcePath);

  writeJson(
    tree,
    join(options.projectRoot, `package.json`),
    packageJson(options),
  );

  writeJson(tree, join(options.projectRoot, `tsconfig.json`), packageTsConfig);

  addProject(tree, options);

  updateCodeWorkspace(tree, options);
};
