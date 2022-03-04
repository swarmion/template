import { Tree, updateJson } from '@nrwl/devkit';

import { NormalizedSchema } from '../types';

type CodeWorkspaceType = {
  folders: {
    path: string;
    name: string;
  }[];
};

const formatFolderName = (options: NormalizedSchema) =>
  options.name.replace(new RegExp('-', 'g'), ' ') + ' [library]';

export const updateCodeWorkspace = (
  tree: Tree,
  options: NormalizedSchema,
): void => {
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
