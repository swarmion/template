import { TsConfig } from '../../types';

export const packageTsConfig: TsConfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    preserveSymlinks: true,
    baseUrl: '.',
    esModuleInterop: true,
  },
  references: [
    { path: '../../packages/configuration' },
    { path: '../../packages/serverless-configuration' },
    { path: '../../packages/serverless-helpers' },
    { path: '../../contracts/core-contracts' },
  ],
  include: ['./**/*.ts'],
  'ts-node': {
    files: true,
  },
};
