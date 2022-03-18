import { TsConfig } from '../../types';

export const packageTsConfig: TsConfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    baseUrl: 'src',
    composite: true,
    // @ts-expect-error ttypescript types are not defined
    plugins: [{ transform: '@zerollup/ts-transform-paths' }],
    emitDeclarationOnly: true,
    outDir: './dist/types',
  },
  exclude: ['./dist'],
  include: ['./**/*.ts'],
};
