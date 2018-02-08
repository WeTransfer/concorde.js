describe('Cookie bundle', async () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(`${global.__CONFIG__.baseUrl}/cookie/__e2e__/index.html`);
  });

  it('should render browser info', async () => {
    await page.waitForSelector('#results');

    const results = await page.$eval('#results', (e) => e.innerHTML);
    expect(results).toMatchSnapshot();
  });
});
