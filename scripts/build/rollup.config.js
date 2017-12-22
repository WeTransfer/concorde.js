import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const input = 'index.js';
const outputConfig = (moduleName, env) => {
  return {
    file: `dist/concorde-${moduleName}.${env}.js`,
    format: 'cjs'
  };
};

export default (moduleName) => ([
  {
    input,
    output: outputConfig(moduleName, 'development'),
    plugins: [babel()]
  },
  {
    input,
    output: outputConfig(moduleName, 'production.min'),
    plugins: [babel(), uglify()]
  }
]);
