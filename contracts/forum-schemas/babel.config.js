const commonBabelConfig = require('../../commonConfiguration/babel.config');

const plugins = [
  [
    'module-resolver',
    {
      root: ['.'],
      alias: {
        types: './types',
        schemas: './schemas',
        utils: './utils',
      },
    },
  ],
  '@babel/plugin-transform-runtime',
];

module.exports = commonBabelConfig(plugins);
