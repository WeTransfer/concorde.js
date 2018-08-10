# concorde-browser
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser)

Browser module. Handy functions to retrieve information and capabilities from the browser.

## Installation

```sh
npm install @wetransfer/concorde-browser --save
```

## Usage

### In the browser

Import the package if your are using a package bundler like Webpack or Parcel:

```js
import Browser from '@wetransfer/concorde-browser';

if (Browser.supportsTouchEvents) {
  // Do some magic!
}
```

Or load directly the final bundle on your browser, using a script tag. All concorde.js modules will be available in a global variable called `WT`:

```html
<!-- This will load the latest version of @wetransfer/concorde-browser module -->
<script src="https://unpkg.com/@wetransfer/concorde-browser/dist/concorde-browser.min.js"></script>
<script>
  console.log(WT.browser.isMobile); // true/false
</script>
```

### On the server

```js
const Browser = require('@wetransfer/concorde-browser');

let deps;
if (Browser.platform('windows')) {
  deps = require('windows/deps');
} else {
  deps = require('unix/deps');
}
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-browser`

## API

Check the available documentation on [wetransfer.github.io](https://wetransfer.github.io/concorde.js/module-Browser.html).
