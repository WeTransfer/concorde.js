# concorde-cookie
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-cookie.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-cookie)

Cookie module. Handy functions to deal with cookies on the browser.

## Installation

```sh
npm install @wetransfer/concorde-cookie --save
```

## Usage

### In the browser

```js
import Cookie from '@wetransfer/concorde-cookie';

if (Cookie.get('SSID')) {
  // Do some magic!
}
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
