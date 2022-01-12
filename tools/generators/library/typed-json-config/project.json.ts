import { ProjectConfiguration } from '@nrwl/devkit';

export const packageProjectJson = (path: string): ProjectConfiguration => ({
  root: `${path}`,
  projectType: 'library',
  tags: [],
  implicitDependencies: [],
});
