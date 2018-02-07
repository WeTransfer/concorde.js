const puppeteer = require('puppeteer');

describe('Cookie bundle', async () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  });

  afterAll(() => {
    browser.close();
  });

  it('should render browser info', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/modules/cookie/__e2e__/index.html');
    await page.waitForSelector('#results');

    const results = await page.$eval('#results', (e) => e.innerHTML);
    expect(results).toMatchSnapshot();
  });
});
