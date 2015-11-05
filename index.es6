// This is based on jquery.client (from old WT source)

import Search from './search';

let currentPlatform = Search.platform();
let currentBrowser = Search.browser();
let currentVersion = Search.version(currentBrowser);

export default class Browser {
  static oneOf(lines = []) {
    if (typeof lines == 'string') lines = [lines];
    return !!lines.filter(line => Browser.matches(line)).length;
  }

  static matches(query) {
    let matches = query.split(/\s+/);
    if (matches.length != 3) return false;

    // expand the query
    [browser, operator, version] = matches;
    
    // does it match the browser?
    if (!currentBrowser.identity.match(new RegExp(browser, 'i'))) {
      return false;
    }

    // match the operator
    let version = parseFloat(version);
    switch (operator) {
      case '>=':
        return currentVersion >= version;
      case '>':
        return currentVersion > version;
      case '<':
        return currentVersion < version;
      case '<=':
        return currentVersion <= version;
      case '=':
      case '==':
        return currentVersion == version;
      default:
        return false;
    }
  }
}