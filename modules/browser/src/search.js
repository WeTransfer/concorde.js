import Config from './config';

// Find a match in the input to see if we have a known browser/platform
const filterConfig = (input) => {
  const options = input.filter((browser) => {
    if (browser.string && browser.string.indexOf(browser.subString) !== -1) {
      return true;
    } else if (browser.prop) {
      return true;
    }
  });

  if (!options.length) {
    return { identity: 'unknown' };
  }

  return options.shift();
};

const versionFromString = (browser, string) => {
  const search = browser.versionSearch || browser.identity;
  const index = string.indexOf(search);

  if (index === -1) {
    return false;
  }

  const version = string.substring(index + search.length + 1).split(' ');
  return version[0].split('.').map((num) => parseFloat(num));
};

// To help determine the current platform/browser/version
export const Search = {
  get platform() {
    return filterConfig(Config.platform);
  },

  get browser() {
    return filterConfig(Config.browser);
  },

  version(browser) {
    return (
      versionFromString(browser, navigator.userAgent) ||
      versionFromString(browser, navigator.appVersion) ||
      'unknown'
    );
  }
};
