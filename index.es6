import Merge from 'deepmerge';

let defaultOptions = {};

// Slightly based on jQuery.cookie
export default class Cookie {
  static configure(options) {
    defaultOptions = Merge(defaultOptions, options);
  }

  static set(key, value, options = {}) {
    options = Merge(defaultOptions, options);

    // Are we unsetting this cookie?
    if (value === null || value === undefined) {
      options.days = -1;
    }

    // Do we have an expiry in days?
    if (Number.isInteger(options.days)) {
      options.expires = new Date();
      options.expires.setDate(options.expires.getDate() + options.days);
    }

    // Make sure value is a string
    key = encodeURIComponent(key);
    value = String(value);
    value = options.raw ? value : encodeURIComponent(value);

    // Build our cookie string
    let cookieBuilder = [
      `${key}=${value}`
    ];

    // Does the cookie have expiry settings?
    if (options.expires) {
      cookieBuilder.push('expires=' + options.expires.toUTCString());
    }

    // Does the cookie need a path?
    if (options.path) {
      cookieBuilder.push('path=' + options.path);
    }

    // Does the cookie need a domain?
    if (options.domain) {
      cookieBuilder.push('domain=' + options.domain);
    }

    // Does the cookie need to be secure?
    if (options.secure) {
      cookieBuilder.push('secure');
    }

    // Set the cookie, yay
    document.cookie = cookieBuilder.join('; ');
  }

  // Unsetting is setting with null value.
  static unset(key, options = {}) {
    Cookie.set(key, null, options);
  }

  // Get cookie value.
  static get(key, {defaultValue = null, raw = false} = {}) {
    if (!document.cookie) return defaultValue;
    let regexp = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)');
    let result = document.cookie.match(regexp);
    if (!result) return defaultValue;
    return raw ? result[1] : decodeURIComponent(result[1]);
  }
}