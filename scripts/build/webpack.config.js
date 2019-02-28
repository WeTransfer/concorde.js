const entry = './index.js';
// FIX this when Webpack 4 documentation is updated, and mode option is available somewhere
const isDev = process.argv[3].toLowerCase() === 'development';
const outputConfig = (moduleName, isDev) => ({
  filename: isDev ? `concorde-${moduleName}.js` : `concorde-${moduleName}.min.js`,
  library: ['WT', moduleName],
  libraryTarget: 'umd',
});

module.exports = (moduleName) => ([
  {
    entry,
    output: outputConfig(moduleName, isDev),
    module: {
      rules: [
        {
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['ie >= 9'],
                    },
                    useBuiltIns: false,
                    modules: false,
                  },
                ],
              ],
            },
          }],
          test: /\.(js)$/,
        },
      ],
    },
    stats: {
      all: false,
      assets: true,
      timings: true,
      warnings: true,
    },
  },
]);
