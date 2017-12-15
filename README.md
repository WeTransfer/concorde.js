# concorde.js
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/371cbb95f8404206928c96769a7e5de1)](https://www.codacy.com/app/WeTransfer/concorde.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=WeTransfer/concorde.js&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/WeTransfer/concorde.js.svg?branch=master)](https://travis-ci.org/WeTransfer/concorde.js)

A sexy pinnacle of engineering that’s nonetheless incredibly inefficient and expensive and goes out of business because it can’t find enough use. It also provides some tools to deal with the browser.

## Installation

In a browser (to be decided):
```html
<script src="cdn.wetransfer.com/js/concorde.min.js"></script>
```

Using npm:
```shell
$ npm i --save @wetransfer/concorde
```

## Usage

With ES6 modules:
```js
// Load the full build.
import concorde from '@wetransfer/concorde';

// Load the http build.
import http from '@wetransfer/concorde-http';

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
import { get } from '@wetransfer/concorde-http';
```


In Node.js:
```js
// Load the full build.
const concorde = require('@wetransfer/concorde');

// Load the http build.
const http = require('@wetransfer/concorde-http');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
const { get } = require('@wetransfer/concorde-http');
```
