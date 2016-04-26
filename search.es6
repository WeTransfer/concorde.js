import Config from './config';

// Find a match in the input to see if we have a known browser/platform
function filterConfig(input) {
  let options = input.filter(browser => {
    if (browser.string) {
      if (browser.string.indexOf(browser.subString) !== -1) {
        return true;
      }
    } else if (browser.prop) {
      return true;
    }
  });

  if (!options.length) return {identity: 'unknown'};
  return options.shift();
}

// To help determine the current platform/browser/version
export default class Search {
  static platform() {
    return filterConfig(Config.platform);
  }

  static browser() {
    return filterConfig(Config.browser); 
  }

  static version(browser, string = false) {
    if (string === false) {
      return Search.version(browser, navigator.userAgent)
      || Search.version(browser, navigator.appVersion)
      || 'unknown';
    }

    let search = browser.versionSearch || browser.identity;
    let index = string.indexOf(search);

    if (index === -1) return false;

    let version = string.substring(index + search.length + 1).split(' ');
    if (!version.length) return false;
    return version[0].split('.').map(num => parseFloat(num));
  }
};