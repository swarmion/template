import type { Config } from '@jest/types';

import { jestConfig } from '@swarmion-starter/configuration';

const config: Config.InitialOptions = {
  ...jestConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components(/(.*)|)$': '<rootDir>/src/components/$1',
  },
  setupFiles: ['dotenv-flow/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.ts'],
};

export default config;
