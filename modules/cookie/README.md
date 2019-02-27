# concorde-cookie
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-cookie.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-cookie)

Cookie module. Handy functions to deal with cookies on the browser.

## Installation

```sh
npm install @wetransfer/concorde-cookie --save
```

## Usage

### In the browser

Import the package if your are using a package bundler like Webpack or Parcel:

```js
import Cookie from '@wetransfer/concorde-cookie';

if (Cookie.get('SSID')) {
  // Do some magic!
}
```

Or load directly the final bundle on your browser, using a script tag. All concorde.js modules will be available in a global variable called `WT`:

```html
<!-- This will load the latest version of @wetransfer/concorde-cookie module -->
<script src="https://unpkg.com/@wetransfer/concorde-cookie/dist/concorde-cookie.min.js"></script>
<script>
  WT.cookie.set('SSID', 'BBlPjuhTimjov9RCB', { secure: true });
</script>
```

### On the server

```js
const Cookie = require('@wetransfer/concorde-cookie');

Cookie.set('SSID', 'BBlPjuhTimjov9RCB', { secure: true });
```

## Methods

**Cookie.configure**

Configure default options used when settings values for cookies. If all your cookies must present the same property, like secure, use this method before setting the cookie values.

```js
Cookie.configure({ secure: true });
Cookie.set('foo', 'bar');
// => foo=bar; secure'
```

The following options can be configured:

```js
Cookie.configure({
  // Cookie expiration date
  expires: new Date('Fri, 01 Jan 2016 09:05:12 GMT'),
  // Sets the URI to which the Cookie applies. Must be an absolute path.
  path: '/path',
  // Sets the domain to which the Cookie applies. If a domain is specified, subdomains are always included.
  domain: 'wetransfer.com',
  // Cookie to only be transmitted over secure protocol as https.
  secure:true,
});
```

**Cookie.get**

Get the value from a cookie, given a cookie name.

```js
Cookie.get('foo');
// => 'bar'
   
// Default value in case cookies are not available or the value has not been set previously.
Cookie.get('nonexistant', { defaultValue: 1 });
// => 1
  
// If raw property is true, the value of the cookie is not decoded.
Cookie.get('bar', { raw: true });
// => 'bar%20value'
```

**Cookie.set**

Set the value for a cookie. If extra options are specified, they will override default options defined with `configure method`.

```js
Cookie.set('foo', 'bar');
// => 'foo=bar'

// Set extra options for the current cookie
Cookie.set('foo', 'bar', { secure: true});
// => 'foo=bar; secure'
```

**Cookie.unset**

Unsets the value of a cookie, with `null`, and expires it.

```js
Cookie.unset('foo');
// => 'foo=null; expires=Thu, 21 Dec 2017 10:57:39 GMT'
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-cookie`

