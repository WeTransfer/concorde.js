// This is based on jquery.client (from old WT source)

import Search from './search';
import CompareVersion from './version';

let currentPlatform = Search.platform();
let currentBrowser = Search.browser();
let currentVersion = Search.version(currentBrowser);

export default class Browser {
  // A method to match the current browser to a list of options.
  static oneOf(lines = []) {
    if (typeof lines === 'string') lines = [lines];
    return !!lines.filter(line => Browser.matches(line)).length;
  }

  // Return the current Browser identity (OS + Browser)
  static identity() {
    return {
      platform: currentPlatform.identity,
      browser: currentBrowser.identity,
      version: currentVersion.join('.')
    };
  }

  // Test if this is the platform you would expect
  static platform(query) {
    return !!currentPlatform.identity.match(new RegExp(query, 'i'));
  }

  // Test if this document supports touch, however... There is much 
  // discussion about detecting touch in Modernizr here:
  // https://github.com/Modernizr/Modernizr/issues/548
  // We will just sniff the popular stuff for now.
  static get supportsTouchEvents() {
    return Browser.isMobile && 
      (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
  }

  // This sounds pretty mobile..
  static get isMobile() {
    return !!/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static get isTablet() {
    return !!/iPad/i.test(navigator.userAgent);
  }

  // See if our query matches our current browser (and version)
  static matches(query) {
    let result = query.split(/\s+/);

    // expand the query
    let [browser] = result;

    // does it match the browser?
    if (!currentBrowser.identity.match(new RegExp(browser, 'i'))) {
      return false;
    }

    // No other params? Then it is finished and succesful
    if (result.length <= 1) return true;

    // expand the query
    let operator, version;
    [browser, operator, version] = result;

    // Compare the versions
    return CompareVersion(currentVersion, operator, version);
  }
}