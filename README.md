# concorde.js
[![Maintainability](https://api.codeclimate.com/v1/badges/3ee2a4bc64d648437f15/maintainability)](https://codeclimate.com/github/WeTransfer/concorde.js/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3ee2a4bc64d648437f15/test_coverage)](https://codeclimate.com/github/WeTransfer/concorde.js/test_coverage)

A sexy pinnacle of engineering that’s nonetheless incredibly inefficient and expensive and goes out of business because it can’t find enough use

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
