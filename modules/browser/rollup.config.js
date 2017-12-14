import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/index.js',
      format: 'es'
    },
    plugins: [
      babel()
    ]
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/concorde-browser.min.js',
      format: 'umd',
      name: 'concordeBrowser'
    },
    plugins: [
      babel(),
      uglify()
    ]
  }
];
