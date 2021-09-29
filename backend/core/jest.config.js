const { resolve } = require('path');

const jestConfig = require('../../../commonConfiguration/jest.config');

module.exports = {
  ...jestConfig,
  runner: 'groups',
  moduleNameMapper: {
    '^@libs/(.*)$': resolve(__dirname, 'libs/$1'),
    '^@resources/(.*)$': resolve(__dirname, 'resources/$1'),
    '^@functions/(.*)$': resolve(__dirname, 'functions/$1'),
    '^@integrationTests/(.*)$': resolve(__dirname, 'integrationTests/$1'),
  },
};
