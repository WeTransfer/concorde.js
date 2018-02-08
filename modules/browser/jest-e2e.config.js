const config = require('../../scripts/jest/default-config');

module.exports = config({
  globalSetup: '../../scripts/jest/setup-chronium',
  globalTeardown: '../../scripts/jest/teardown-chronium',
  testEnvironment: '../../scripts/jest/puppeteer-environment',
  setupFiles: [],
  testMatch: [
    '**/__e2e__/*.js'
  ]
});
