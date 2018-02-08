module.exports = async () => {
  // close the browser instance
  await global.__BROWSER__.close();
};
