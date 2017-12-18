# concorde-browser
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser)

Browser module. Handy functions to retrieve information and capabilities from the browser.

## Installation

```sh
npm install @wetransfer/concorde-browser --save
```

## Usage

### In the browser

```js
import Browser from '@wetransfer/concorde-browser';

if (Browser.supportsTouchEvents) {
  // Do some magic!
}
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

## API

Check the available documentation on [wetransfer.github.io](https://wetransfer.github.io/concorde.js/module-Browser.html).
