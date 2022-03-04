import {
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

import { NormalizedSchema, Schema } from '../types';

export const normalizeOptions = (
  tree: Tree,
  options: Schema,
): NormalizedSchema => {
  const name = names(options.name).fileName;
  const projectDirectory =
    options.directory !== undefined && options.directory !== ''
      ? `${names(options.directory).fileName}/${name}`
      : name;

  const unitTestRunner = options.skipJestConfig === true ? 'none' : 'jest';

  const linter = Linter.EsLint;

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = getCaseAwareFileName({
    fileName: projectName,
    pascalCaseFiles: false,
  });
  const { npmScope } = getWorkspaceLayout(tree);

  const projectRoot = joinPathFragments('packages', projectDirectory);

  const importPath = `@${npmScope}/${projectDirectory}`;

  return {
    ...options,
    fileName,
    importPath,
    linter,
    name: projectName,
    projectDirectory,
    projectRoot,
    unitTestRunner,
    workspaceName: npmScope,
  };
};

const getCaseAwareFileName = (options: {
  pascalCaseFiles: boolean;
  fileName: string;
}) => {
  const normalized = names(options.fileName);

  return options.pascalCaseFiles ? normalized.className : normalized.fileName;
};
