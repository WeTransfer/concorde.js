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
};

module.exports = {
  presets: presets[process.env.NODE_ENV],
};
