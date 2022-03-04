/* eslint-disable max-lines */
import {
  addProjectConfiguration,
  convertNxGenerator,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  installPackagesTask,
  joinPathFragments,
  names,
  offsetFromRoot,
  toJS,
  Tree,
  updateJson,
  writeJson,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { symlinkSync } from 'fs';
import { join } from 'path';

import { Schema } from './schema';
import {
  packageJson,
  packageProjectJson,
  packageTsConfig,
} from './typed-json-config';

export interface NormalizedSchema extends Schema {
  name: string;
  fileName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  importPath: string;
  workspaceName: string;
}
const SOURCE_FOLDER = './files';

type CodeWorkspaceType = {
  folders: {
    path: string;
    name: string;
  }[];
};

const formatFolderName = (options: NormalizedSchema) =>
  options.name.replace(new RegExp('-', 'g'), ' ') + ' [library]';

const addProject = (tree: Tree, options: NormalizedSchema) => {
  const projectConfiguration = packageProjectJson(options.projectRoot);

  addProjectConfiguration(tree, options.name, projectConfiguration);
};

const updateCodeWorkspace = (tree: Tree, options: NormalizedSchema) => {
  updateJson(
    tree,
    `${options.workspaceName}.code-workspace`,
    (json: CodeWorkspaceType) => {
      json.folders.push({
        path: options.projectRoot,
        name: formatFolderName(options),
      });

      return json;
    },
  );
};

const createFiles = (tree: Tree, options: NormalizedSchema) => {
  const { className, name, propertyName } = names(options.name);

  generateFiles(tree, join(__dirname, SOURCE_FOLDER), options.projectRoot, {
    ...options,
    dot: '.',
    className,
    name,
    propertyName,
    js: options.js === true,
    cliCommand: 'nx',
    strict: undefined,
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    hasUnitTestRunner: options.unitTestRunner !== 'none',
  });

  if (options.unitTestRunner === 'none') {
    tree.delete(
      join(options.projectRoot, 'src/lib', `${options.fileName}.spec.ts`),
    );
  }

  if (options.skipBabelrc === true) {
    tree.delete(join(options.projectRoot, '.babelrc'));
  }

  if (options.js === true) {
    toJS(tree);
  }
};

export const libraryGenerator = async (
  tree: Tree,
  schema: Schema,
): Promise<void> => {
  const options = normalizeOptions(tree, schema);

  createFiles(tree, options);

  writeJson(
    tree,
    join(options.projectRoot, `package.json`),
    packageJson(options),
  );

  writeJson(tree, join(options.projectRoot, `tsconfig.json`), packageTsConfig);

  addProject(tree, options);

  updateCodeWorkspace(tree, options);

  if (!(options.skipFormat === true)) {
    await formatFiles(tree);
  }

  return;
};

export const librarySchematic = convertNxGenerator(libraryGenerator);

const normalizeOptions = (tree: Tree, options: Schema): NormalizedSchema => {
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

export default async (tree: Tree, schema: Schema): Promise<() => void> => {
  await libraryGenerator(tree, { name: schema.name });
  await formatFiles(tree);

  return () => {
    symlinkVsCodeConfiguration(tree, schema);
    installPackagesTask(tree, true);
  };
};

const symlinkVsCodeConfiguration = (tree: Tree, schema: Schema) => {
  const options = normalizeOptions(tree, schema);

  symlinkSync(
    join(tree.root, 'commonConfiguration/.vscode'),
    join(options.projectRoot, '.vscode'),
    'dir',
  );
};
