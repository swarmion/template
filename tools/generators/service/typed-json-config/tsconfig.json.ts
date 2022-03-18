import { TsConfig } from '../../types';

export const packageTsConfig: TsConfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    preserveSymlinks: true,
    baseUrl: '.',
    esModuleInterop: true,
  },
  references: [
    { path: '../../contracts/core-contracts/tsconfig.build.json' },
    { path: '../../packages/configuration/tsconfig.build.json' },
    { path: '../../packages/serverless-configuration/tsconfig.build.json' },
    { path: '../../packages/serverless-helpers/tsconfig.build.json' },
  ],
  include: ['./**/*.ts'],
  'ts-node': {
    files: true,
  },
};
