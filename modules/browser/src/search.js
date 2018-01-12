/**
 * Search module. Retrieves some basic information from the browser, like the version and such.
 * @module Search
 * @since 1.0.0
 */

import Config from './config';
import { versionToArray } from './version';

export const Search = {
  /**
   * The object containing platorm information.
   * @since 1.0.0
   * @member {Object} platform The object containing platform information.
   * @example
   *
   * import { Search } from '@wetransfer/concorde-browser';
   *
   * Search.platform
   * // => { string: 'MacIntel', subString: 'Mac', identity: 'Mac' }
   */
  get platform() {
    return filterConfig(Config.platform);
  },

  /**
   * The object containing current browser information.
   * @since 1.0.0
   * @member {Object} browser The object containing browser information.
   * @example
   *
   * import { Search } from '@wetransfer/concorde-browser';
   *
   * Search.browser
   * // => {
   * //   string: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
   * //   subString: 'Chrome',
   * //   identity: 'Chrome'
   * //}
   */
  get browser() {
    return filterConfig(Config.browser);
  },

  /**
   * Determines the version of a browser based on its userAgent string
   * @since 1.0.0
   * @function version
   * @param   {Object} browser An object containing browser information.
   * @param   {String} browser.userAgent Browser userAgent string.
   * @param   {String} browser.identity Browser identity string.
   * @param   {String} browser.version Browser version string.
   * @returns {Array|String} An array containing the browser version or 'unknown' string
   * @example
   * import { Search } from '@wetransfer/concorde-browser';
   *
   * const browser = {
   *   userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
   *   identity: 'Chrome',
   *   version: '3289'
   * };
   * Search.version(browser);
   * // => [62, 0, 3202, 94]
   */
  version(browser) {
    return (
      versionFromString(browser, navigator.userAgent) ||
      versionFromString(browser, navigator.appVersion) ||
      'unknown'
    );
  }
};

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

// Converts browser version into an array
function versionFromString(browser, string) {
  const search = browser.versionSearch || browser.identity;
  const index = string.indexOf(search);

  if (index === -1) {
    return false;
  }

  const version = string.substring(index + search.length + 1).split(' ');
  return versionToArray(version[0]);
}
