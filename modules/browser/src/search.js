import Config from './config';

// Find a match in the input to see if we have a known browser/platform
function filterConfig(input) {
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
}

// To help determine the current platform/browser/version
export const Search = {
  get platform() {
    return filterConfig(Config.platform);
  },

  get browser() {
    return filterConfig(Config.browser);
  },

  version(browser, string = false) {
    if (string === false) {
      return this.version(browser, navigator.userAgent)
        || this.version(browser, navigator.appVersion)
        || 'unknown';
    }

    const search = browser.versionSearch || browser.identity;
    const index = string.indexOf(search);

    if (index === -1) {
      return false;
    }

    const version = string.substring(index + search.length + 1).split(' ');
    return version[0].split('.').map((num) => parseFloat(num));
  }
};
