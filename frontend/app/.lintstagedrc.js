const baseConfig = require('../../commonConfiguration/lintstaged-base-config');

module.exports = {
  ...baseConfig,
  '*.{ts,tsx}': 'yarn stylelint:fix',
};
