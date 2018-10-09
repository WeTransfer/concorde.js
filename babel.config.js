const presets = {
  test: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  production: [
    [
      '@babel/preset-env',
      {
        targets: {
          'ie': '9',
        },
        useBuiltIns: false,
        modules: false,
      },
    ],
  ],
};

module.exports = {
  presets: presets[process.env.NODE_ENV],
};
