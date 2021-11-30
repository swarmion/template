const commonBabelConfig = require('../../commonConfiguration/babel.config');

const plugins = [
  [
    'module-resolver',
    {
      root: ['.'],
      alias: {
        contracts: './contracts',
      },
    },
  ],
];

module.exports = commonBabelConfig(plugins);
