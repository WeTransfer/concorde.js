# concorde-timer
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-timer.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-timer)

Useful functions to deal with timing in JavaScript.

## Installation

```sh
npm install @wetransfer/concorde-timer --save
```

## Usage

### In the browser

```js
import Timer from '@wetransfer/concorde-timer';

const timedFunction = () => {
   console.log('ping!')
}

const stopwatch = new Timer(10000, timedFunction);
// => Timer {remaining: 10000, callback: ƒ, paused: false, delay: 10, time: 1523436642013}

// (T+5 seconds)
stopwatch
// => Timer {remaining: 5000, callback: ƒ, paused: false, delay: 10, time: 1523436647000}

// (T+10 seconds)
// 'ping!'
```

### On the server

```js
const Timer = require('@wetransfer/concorde-timer');

const timedFunction = () => {
   console.log('ping!')
}

const stopwatch = new Timer(10000, timedFunction);
// => Timer {remaining: 10000, callback: ƒ, paused: false, delay: 10, time: 1523436642013}

// (T+5 seconds)
stopwatch
// => Timer {remaining: 5000, callback: ƒ, paused: false, delay: 10, time: 1523436647000}

// (T+10 seconds)
// 'ping!'
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-timer`

## API

Check the available documentation on [wetransfer.github.io](https://wetransfer.github.io/concorde.js/module-Timer.html).
