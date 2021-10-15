const { resolve } = require('path');

const jestConfig = require('../../commonConfiguration/jest.config');

module.exports = {
  ...jestConfig,
  runner: 'groups',
  moduleNameMapper: {
    '^@resources/(.*)$': resolve(__dirname, 'resources/$1'),
  },
};
