const puppeteer = require('puppeteer');

describe('Browser bundle', async () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  });

  afterAll(() => {
    browser.close();
  });

  it('should render browser info', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/modules/browser/__e2e__/index.html');
    await page.waitForSelector('#results');

    const platform = await page.$eval('#browser', (e) => e.innerHTML);
    expect(platform).toMatch('HeadlessChrome');
    const isChrome = await page.$eval('#is_chrome', (e) => e.innerHTML);
    expect(isChrome).toBe('true');
  });
});
