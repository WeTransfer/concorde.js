describe('Browser bundle', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(`${global.__CONFIG__.baseUrl}/browser/__e2e__/index.html`);
  });

  it('should render browser info', async () => {
    await page.waitForSelector('#results');

    const platform = await page.$eval('#browser', (e) => e.innerHTML);
    expect(platform).toMatch('HeadlessChrome');
    const isChrome = await page.$eval('#is_chrome', (e) => e.innerHTML);
    expect(isChrome).toBe('true');
  });
});
