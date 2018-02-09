# concorde-debounce
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-debounce.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-debounce)

Debounce functions. Handy functions to debounce regular and async function executions.

## Installation

```sh
npm install @wetransfer/concorde-cookie --save
```

## Usage

### In the browser

```js
import { debounce } from '@wetransfer/concorde-debounce';

let counter = 0;
const debounced = debounce(() => counter++);

debounced();
debounced();
debounced();

console.log(counter); // => 1
```

### On the server

```js
const { debounce } = require('@wetransfer/concorde-debounce');

let counter = 0;
const debounced = debounce(() => counter++);

debounced();
debounced();
debounced();

console.log(counter); // => 1
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-debounce`

## API

Check the available documentation on [wetransfer.github.io](https://wetransfer.github.io/concorde.js/module-Debounce.html).
