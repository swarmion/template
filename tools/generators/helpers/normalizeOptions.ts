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

  if (!options.unitTestRunner) {
    options.unitTestRunner = 'jest';
  }

  if (!options.linter) {
    options.linter = Linter.EsLint;
  }

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = getCaseAwareFileName({
    fileName: options.simpleModuleName === true ? name : projectName,
    pascalCaseFiles: options.pascalCaseFiles === true,
  });

  const { npmScope } = getWorkspaceLayout(tree);

  const projectRoot = joinPathFragments('packages', projectDirectory);

  const parsedTags =
    options.tags !== undefined
      ? options.tags.split(',').map(s => s.trim())
      : [];

  const defaultImportPath = `@${npmScope}/${projectDirectory}`;
  const importPath = options.importPath ?? defaultImportPath;

  return {
    ...options,
    fileName,
    name: projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    importPath,
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
