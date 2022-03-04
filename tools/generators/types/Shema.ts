import { Linter } from '@nrwl/linter';

export interface Schema {
  name: string;
  directory?: string;
  skipTsConfig?: boolean;
  skipFormat?: boolean;
  tags?: string;
  simpleModuleName?: boolean;
  unitTestRunner?: 'jest' | 'none';
  linter?: Linter;
  testEnvironment?: 'jsdom' | 'node';
  importPath?: string;
  js?: boolean;
  babelJest?: boolean;
  pascalCaseFiles?: boolean;
  strict?: boolean;
  skipBabelrc?: boolean;
  buildable?: boolean;
  setParserOptionsProject?: boolean;
  standaloneConfig?: boolean;
}

export interface NormalizedSchema extends Schema {
  name: string;
  fileName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  importPath: string;
  workspaceName: string;
}
