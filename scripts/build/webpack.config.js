const entry = './index.js';
// FIX this when Webpack 4 documentation is updated, and mode option is available somewhere
const isDev = process.argv[3].toLowerCase() === 'development';
const outputConfig = (moduleName, isDev) => ({
  filename: isDev ? `concorde-${moduleName}.js` : `concorde-${moduleName}.min.js`,
  library: 'wt_' + moduleName,
  libraryTarget: 'umd'
});

module.exports = (moduleName) => ([
  {
    entry,
    output: outputConfig(moduleName, isDev),
    stats: {
      all: false,
      assets: true,
      timings: true,
      warnings: true
    }
  }
]);
