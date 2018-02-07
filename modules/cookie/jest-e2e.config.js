const config = require('../../scripts/jest/default-config');

module.exports = config({
  setupFiles: [],
  testMatch: [
    '**/__e2e__/*.js'
  ]
});
