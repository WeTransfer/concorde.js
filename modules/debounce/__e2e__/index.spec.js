describe('Debounce bundle', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(`${global.__CONFIG__.baseUrl}/debounce/__e2e__/index.html`);
  });

  it('should render debounced counter', async (done) => {
    await page.waitForSelector('#results');

    setTimeout(async () => {
      const counter = await page.$eval('#debounce', (e) => parseInt(e.innerHTML, 10));
      expect(counter).toBe(1);
      done();
    });
  });
});
