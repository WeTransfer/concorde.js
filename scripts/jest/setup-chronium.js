const puppeteer = require('puppeteer');

module.exports = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  // store the browser instance so we can teardown it later
  global.__BROWSER__ = browser;
};
