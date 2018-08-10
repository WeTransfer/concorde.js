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

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-cookie`

## API

Check the available documentation on [wetransfer.github.io](https://wetransfer.github.io/concorde.js/module-Cookie.html).
