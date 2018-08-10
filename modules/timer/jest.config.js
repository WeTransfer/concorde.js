const config = require('../../scripts/jest/default-config');

module.exports = config({
  setupFiles: ['../../scripts/jest/setup-environment.js'],
});
