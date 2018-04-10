/**
 * Cookie module. Handy functions to deal with cookies on the browser.
 * @module Cookie
 * @since 1.0.0
 */

let defaultOptions = {};

// Build our cookie string
function buildOptions(initialValue = [], opts = {}) {
  // Do we have an expiry in days?
  if (Number.isInteger(opts.days)) {
    opts.expires = new Date();
    opts.expires.setDate(opts.expires.getDate() + opts.days);
  }

  // Does the cookie have expiry settings?
  if (opts.expires) {
    initialValue.push(`expires=${opts.expires.toUTCString()}`);
  }

  // Does the cookie need a path?
  if (opts.path) {
    initialValue.push(`path=${opts.path}`);
  }

  // Does the cookie need a domain?
  if (opts.domain) {
    initialValue.push(`domain=${opts.domain}`);
  }

  // Does the cookie need to be secure?
  if (opts.secure) {
    initialValue.push('secure');
  }

  return initialValue.join('; ');
}

export default {
  /**
   * Configure default options used when settings values for cookies.
   * If all your cookies must present the same property, like secure,
   * use this method before setting the cookie values.
   * @since 1.0.0
   * @function configure
   * @param {Object} options Default options for future cookie values.
   * @param {Date} options.expires Cookie expiration date
   * @param {String} options.path Sets the URI to which the Cookie applies. Must be an absolute path.
   * @param {String} options.domain Sets the domain to which the Cookie applies. If a domain is specified, subdomains are always included.
   * @param {boolean} options.secure Cookie to only be transmitted over secure protocol as https.
   * @example
   *
   * import Cookie from '@wetransfer/concorde-cookie';
   *
   * Cookie.configure({ secure: true });
   * Cookie.set('foo', 'bar');
   * // => foo=bar; secure'
   */
  configure(options = {}) {
    defaultOptions = Object.assign({}, options);
  },

  /**
   * Get the value from a cookie, given a key.
   * @since 1.0.0
   * @function get
   * @param {String} key Cookie key name.
   * @param {Object} [options]
   * @param {Any} [options.defaultValue=null] Default value in case cookies are not available or the value has not been set previously.
   * @param {boolean} [options.raw=false] If true, the value of the cookie is not decoded.
   * @example
   *
   * import Cookie from '@wetransfer/concorde-cookie';
   *
   * Cookie.get('foo');
   * // => 'bar'
   *
   * Cookie.get('nonexistant', { defaultValue: 1 });
   * // => 1
   *
   * Cookie.get('yolo', { raw: true });
   * // => 'bar%20yolo'
   */
  get(key, { defaultValue = null, raw = false } = {}) {
    if (!document.cookie) {
      return defaultValue;
    }

    const regexp = new RegExp(
      '(?:^|; )' + encodeURIComponent(key) + '=([^;]*)'
    );
    const result = document.cookie.match(regexp);
    if (!result) {
      return defaultValue;
    }

    return raw ? result[1] : decodeURIComponent(result[1]);
  },

  /**
   * Set the value for a cookie. If extra options are specified, they will override default options
   * defined with `configure method`.
   * @since 1.0.0
   * @function set
   * @param {String} key Cookie key name.
   * @param {String} [value=null] Cookie value.
   * @param {Object} [options={}]
   * @param {Date} [options.expires] Cookie expiration date
   * @param {String} [options.path] Sets the URI to which the Cookie applies. Must be an absolute path.
   * @param {String} [options.domain] Sets the domain to which the Cookie applies. If a domain is specified, subdomains are always included.
   * @param {boolean} [options.secure] Cookie to only be transmitted over secure protocol as https.
   * @example
   *
   * import Cookie from '@wetransfer/concorde-cookie';
   *
   * Cookie.set('foo', 'bar');
   * // => 'foo=bar'
   */
  set(key, value = null, options = {}) {
    const opts = Object.assign({}, defaultOptions, options);

    // Are we unsetting this cookie?
    if (value === null) {
      opts.days = -1;
    }

    // Make sure value is a string
    const safeKey = encodeURIComponent(key);
    let safeValue = String(value);
    safeValue = opts.raw ? safeValue : encodeURIComponent(safeValue);

    // Build and set the cookie, yay!
    document.cookie = buildOptions([`${safeKey}=${safeValue}`], opts);
  },

  /**
   * Unset the value of a cookie, with null, and expires it.
   * @since 1.0.0
   * @function unset
   * @param {String} key Cookie key name.
   * @param {Object} [options={}]
   * @param {Date} [options.expires] Cookie expiration date
   * @param {String} [options.path] Sets the URI to which the Cookie applies. Must be an absolute path.
   * @param {String} [options.domain] Sets the domain to which the Cookie applies. If a domain is specified, subdomains are always included.
   * @param {boolean} [options.secure] Cookie to only be transmitted over secure protocol as https.
   * @example
   *
   * import Cookie from '@wetransfer/concorde-cookie';
   *
   * Cookie.unset('foo');
   * // => 'foo=null; expires=Thu, 21 Dec 2017 10:57:39 GMT'
   */
  unset(key, options = {}) {
    this.set(key, null, options);
  }
};
