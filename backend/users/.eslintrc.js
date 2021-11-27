const generateImportOrderRule = require('../../commonConfiguration/generateImportOrderRule');

module.exports = {
  extends: ['plugin:@serverless-contracts/recommended'],
  rules: generateImportOrderRule(__dirname),
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
