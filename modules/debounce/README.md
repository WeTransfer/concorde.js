# concorde-debounce
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-debounce.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-debounce)

Debounce functions. Handy functions to debounce regular and async function executions.

## Installation

```sh
npm install @wetransfer/concorde-debounce --save
```

## Usage

### In the browser

Import the package if your are using a package bundler like Webpack or Parcel:

```js
import { debounce } from '@wetransfer/concorde-debounce';

let counter = 0;
const debounced = debounce(() => counter++, 10);

debounced();
debounced();
debounced();

console.log(counter); // => 1
```

Or load directly the final bundle on your browser, using a script tag. All concorde.js modules will be available in a global variable called `WT`:

```html
<!-- This will load the latest version of @wetransfer/concorde-debounce module -->
<script src="https://unpkg.com/@wetransfer/concorde-debounce/dist/concorde-debounce.min.js"></script>
<script>
  var counter = 0;
  var debounced = WT.debounce.debounce(function() {
    return counter++;
  }, 10);

  debounced();
  debounced();
  debounced();

  setTimeout(function() {
    console.log(counter); // => 1
  });
</script>
```

### On the server

```js
const { debounce } = require('@wetransfer/concorde-debounce');

let counter = 0;
const debounced = debounce(() => counter++, 10);

debounced();
debounced();
debounced();

console.log(counter); // => 1
```

## Functions

**debounce**

Creates a debounced function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. If no timming value is provided, we default to `0`.

```js
let counter = 0;
const debounced = debounce(() => counter++, 10);

debounced();
debounced();
debounced();

console.log(counter);
// => 1
```

**debounceAsync**

Creates a debounced function that delays invoking the provided **async** function until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. If no timming value is provided, we default to `0`.

```js
let counter = 0;
const debounced = debounceAsync(async (increment = 1) => {
  counter += increment;
  return Promise.resolve(counter);
}, 10);

debounced(1).catch(() => console.error('rejected 1'));
debounced(2).catch(() => console.error('rejected 2'));
debounced(3).then(() => console.log(counter));  // => 3
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-debounce`
