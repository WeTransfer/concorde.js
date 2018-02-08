const defaultConfig = {
  setupFiles: [
    './scripts/jest/setup-environment.js'
  ],
  testMatch: [
    '**/__tests__/*.js'
  ]
};

module.exports = (config) => Object.assign({}, defaultConfig, config);
