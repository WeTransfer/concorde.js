describe('Debounce bundle', async () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(`${global.__CONFIG__.baseUrl}/timer/__e2e__/index.html`);
  });

  it('should render timer function result', async (done) => {
    await page.waitForSelector('#results');

    setTimeout(async () => {
      const counter = await page.$eval('#timer', (e) => e.innerHTML);
      expect(counter).toBe('Wake up!');
      done();
    }, 100);
  });
});
