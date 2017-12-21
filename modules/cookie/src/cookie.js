// Slightly based on jQuery.cookie
export default {
  options: {},

  configure(options) {
    this.options = Object.assign({}, options);
  },

  set(key, value, options = {}) {
    const opts = Object.assign({}, this.options, options);

    // Are we unsetting this cookie?
    if (value === null || value === undefined) {
      opts.days = -1;
    }

    // Do we have an expiry in days?
    if (Number.isInteger(opts.days)) {
      opts.expires = new Date();
      opts.expires.setDate(opts.expires.getDate() + opts.days);
    }

    // Make sure value is a string
    key = encodeURIComponent(key);
    value = String(value);
    value = opts.raw ? value : encodeURIComponent(value);

    // Build our cookie string
    const cookieBuilder = [
      `${key}=${value}`
    ];

    // Does the cookie have expiry settings?
    if (opts.expires) {
      cookieBuilder.push('expires=' + opts.expires.toUTCString());
    }

    // Does the cookie need a path?
    if (opts.path) {
      cookieBuilder.push('path=' + opts.path);
    }

    // Does the cookie need a domain?
    if (opts.domain) {
      cookieBuilder.push('domain=' + opts.domain);
    }

    // Does the cookie need to be secure?
    if (opts.secure) {
      cookieBuilder.push('secure');
    }

    // Set the cookie, yay
    document.cookie = cookieBuilder.join('; ');
  },

  // Unsetting is setting with null value.
  unset(key, options = {}) {
    this.set(key, null, options);
  },

  // Get cookie value.
  get(key, {defaultValue = null, raw = false} = {}) {
    if (!document.cookie) {
      return defaultValue;
    }
    const regexp = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)');
    const result = document.cookie.match(regexp);
    if (!result) {
      return defaultValue;
    }
    return raw ? result[1] : decodeURIComponent(result[1]);
  }
};
