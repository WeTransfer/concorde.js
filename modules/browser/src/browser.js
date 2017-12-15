// This is based on jquery.client (from old WT source)
import { Search } from './search';
import { compareVersion } from './version';

export const Browser = {
  // A method to match the current browser to a list of options.
  get currentBrowser() {
    return Search.browser;
  },

  get currentPlatform() {
    return Search.platform;
  },

  get currentVersion() {
    return Search.version(this.currentBrowser);
  },

  // Return the current Browser identity (OS + Browser)
  get identity() {
    return {
      platform: this.currentPlatform.identity,
      browser: this.currentBrowser.identity,
      version: this.currentVersion.join
        ? this.currentVersion.join('.')
        : this.currentVersion
    };
  },

  // Test if this document supports touch, however... There is much
  // discussion about detecting touch in Modernizr here:
  // https://github.com/Modernizr/Modernizr/issues/548
  // We will just sniff the popular stuff for now.
  get supportsTouchEvents() {
    return (
      (this.isMobile || this.isTablet) &&
      ('ontouchstart' in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch))
    );
  },

  // This sounds pretty mobile..
  get isMobile() {
    return !!/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  /**
   * Check whether the navigation platform is an iPhone
   * @return {Boolean} Whether it is an iPhone
   */
  get isIphone() {
    return /iPhone/.test(navigator.platform);
  },

  get isTablet() {
    return /iPad/i.test(navigator.userAgent);
  },

  oneOf(lines = []) {
    if (typeof lines === 'string') {
      lines = [lines];
    }

    return lines.filter((line) => this.matches(line)).length > 0;
  },

  // Test if this is the platform you would expect
  platform(query = null) {
    return new RegExp(`${query}`, 'i').test(this.currentPlatform.identity);
  },

  isOutdated(supportedBrowsers) {
    return !this.oneOf(supportedBrowsers);
  },

  // See if our query matches our current browser (and version)
  matches(query) {
    const result = query.split(/\s+/);

    const browser = result[0];

    // does it match the browser?
    if (!new RegExp(`${browser}`, 'i').test(this.currentBrowser.identity)) {
      return false;
    }

    // No other params? Then it is finished and succesful
    if (result.length <= 1) {
      return true;
    }

    // expand the query
    const operator = result[1];
    const version = result[2];

    // Compare the versions
    return compareVersion(this.currentVersion, operator, version);
  }
};
