const NodeEnvironment = require('jest-environment-node');

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    this.global.__BROWSER__ = global.__BROWSER__;
    this.global.__CONFIG__ = {
      baseUrl: 'http://localhost:8080/modules'
    };
  }
}

module.exports = PuppeteerEnvironment;
