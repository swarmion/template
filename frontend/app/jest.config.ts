import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

import { jestConfig } from '@swarmion-starter/configuration';

const config: InitialOptionsTsJest = {
  ...jestConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@react-hookz/web/esnext': '@react-hookz/web',
    '^.*\\.svg$': '<rootDir>/src/__mocks__/svgrMock.ts',
  },
  setupFiles: ['dotenv-flow/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.ts'],
};

export default config;
