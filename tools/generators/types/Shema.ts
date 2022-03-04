import { Linter } from '@nrwl/linter';

export interface Schema {
  name: string;
  directory?: string;
  skipJestConfig?: boolean;
}

export interface NormalizedSchema extends Schema {
  fileName: string;
  importPath: string;
  linter: Linter;
  name: string;
  projectDirectory: string;
  projectRoot: string;
  unitTestRunner: 'jest' | 'none';
  workspaceName: string;
}
