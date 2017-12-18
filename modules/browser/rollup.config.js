import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const input = 'index.js';
const outputConfig = (env) => {
  return {
    file: `dist/concorde-browser.${env}.js`,
    format: 'cjs'
  };
};

export default [
  {
    input,
    output: outputConfig('development'),
    plugins: [babel()]
  },
  {
    input,
    output: outputConfig('production.min'),
    plugins: [babel(), uglify()]
  }
];
