import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

import { jestConfig } from '@sls-monorepo/configuration';

const config: InitialOptionsTsJest = {
  ...jestConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^__fixtures__(/(.*)|)$': '<rootDir>/src/__fixtures__/$1',
    '^components(/(.*)|)$': '<rootDir>/src/components/$1',
    '^hooks(/(.*)|)$': '<rootDir>/src/hooks/$1',
    '^pages(/(.*)|)$': '<rootDir>/src/pages/$1',
    '^services(/(.*)|)$': '<rootDir>/src/services/$1',
    '^AppRoutes$': '<rootDir>/src/AppRoutes',
    '^store(/(.*)|)$': '<rootDir>/src/store/$1',
    '^testUtils(/(.*)|)$': '<rootDir>/src/testUtils/$1',
    '^theme(/(.*)|)$': '<rootDir>/src/theme/$1',
    '^translations(/(.*)|)$': '<rootDir>/src/translations/$1',
    '@react-hookz/web/esnext': '@react-hookz/web',
    '^.*\\.svg$': '<rootDir>/src/__mocks__/svgrMock.ts',
  },
  setupFiles: ['dotenv-flow/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.ts'],
};

export default config;
