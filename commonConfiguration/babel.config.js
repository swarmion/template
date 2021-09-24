const defaultPresets = [
  ['@babel/preset-typescript', { allowNamespaces: true }],
];

const defaultIgnores = [
  'node_modules',
  'dist',
];

const presetsForESM = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  ...defaultPresets,
];
const presetsForCJS = [
  [
    '@babel/preset-env',
    {
      modules: 'cjs',
    },
  ],
  ...defaultPresets,
];

module.exports = (plugins = []) => {
  return {
    env: {
      cjs: {
        ignore: defaultIgnores,
        presets: presetsForCJS,
        plugins,
      },
      esm: {
        ignore: defaultIgnores,
        presets: presetsForESM,
        plugins,
      },
    },
  };
};
