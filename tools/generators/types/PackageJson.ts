export interface PackageJson {
  [key: string]: unknown;
  name: string;
  private: boolean;
  version: string;
  license: string;
  sideEffects: boolean;
  files: string[];
  main: string;
  module: string;
  types: string;
  scripts: {
    [key: string]: unknown;
    'lint-fix': string;
    'lint-fix-all': string;
    'linter-base-config': string;
    package: string;
    'package-cjs': string;
    'package-esm': string;
    'package-types': string;
    test: string;
    'test-linter': string;
    'test-type': string;
    'test-unit': string;
    transpile: string;
    watch: string;
  };
  dependencies: {
    [key: string]: unknown;
    '@babel/runtime': string;
  };
  devDependencies: {
    [key: string]: unknown;
    '@babel/cli': string;
    '@babel/core': string;
    '@babel/plugin-transform-runtime': string;
    '@babel/preset-env': string;
    '@babel/preset-typescript': string;
    '@types/node': string;
    '@zerollup/ts-transform-paths': string;
    'babel-plugin-module-resolver': string;
    concurrently: string;
    eslint: string;
    jest: string;
    'json-schema-to-ts': string;
    prettier: string;
    'ts-node': string;
    ttypescript: string;
    typescript: string;
  };
}
