# concorde.js
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/371cbb95f8404206928c96769a7e5de1)](https://www.codacy.com/app/WeTransfer/concorde.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=WeTransfer/concorde.js&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/371cbb95f8404206928c96769a7e5de1)](https://www.codacy.com/app/WeTransfer/concorde.js?utm_source=github.com&utm_medium=referral&utm_content=WeTransfer/concorde.js&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/WeTransfer/concorde.js.svg?branch=master)](https://travis-ci.org/WeTransfer/concorde.js)

A sexy pinnacle of engineering that’s nonetheless incredibly inefficient and expensive and goes out of business because it can’t find enough use. It also provides some tools to deal with the browser.

## Packages

This repository contains a collection of modules used internally by WeTransfer to build our website. You can use them all together or individually, based on your needs.

| Package | Version | Description |
|---------|---------|-------------|
| [concorde-browser](https://github.com/WeTransfer/concorde.js/tree/master/modules/browser) | [![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser) | Browser capabilities detection |

## Usage

Please check individual packages documentation for concrete usage and installation. In a nutshell, it works like that:

With ES6 modules:
```js
// Load the full build.
import Browser from '@wetransfer/concorde-browser';

Browser.isMobile
// => true
```

In Node.js:
```js
// Load the full build.
const browser = require('@wetransfer/concorde-browser');

Browser.platform('windows');
// => false
```


## License

`concorde.js` is available under the MIT license. See the [LICENSE](https://github.com/WeTransfer/concorde.js/blob/master/LICENSE) file for more info.
