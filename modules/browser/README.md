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
  if (Browser.supportsTouchEvents) {
    // Do some magic!
  }
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

## Methods

**Browser.matches**

Given a browser and version requirement, determines if the actual environment meets the given criteria, in terms of browser name and version.

```js
// If the actual browser is Chrome 69

// The result of this call will be true
Browser.matches('chrome >= 43');

// The result of this call will be false
Browser.matches('explorer < 6');
```

**Browser.oneOf**

Given a list of browsers and version requirements, determines if the actual environment meets the criteria.

```js
// If the actual browser is Chrome 69

// The result of this call will be true
Browser.oneOf([
  'explorer >= 9.0',
  'chrome >= 43',
  'firefox >= 42',
  'safari >= 5'
]);
```

**Browser.isOutdated**

Given a list of browsers and version requirements, determines if the actual environment does not meet the criteria, aka, it's outdated. Think in that method as the opposite of `Browser.oneOf`.

```js
// If the actual browser is Chrome 69

// The result of this call will be false
Browser.isOutdated([
  'explorer >= 9.0',
  'chrome >= 43',
  'firefox >= 42',
  'safari >= 5'
]);
```

**Browser.platform**

Determines if the provided platform matches the actual platform. 

```js
Browser.plaform('mac');
// => true

Browser.plaform('windows');
// => false
```

## Properties

**Browser.currentBrowser**

Returns an object containing information about the user agent.

```js
Browser.currentBrowser
// => {
//   string: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
//   subString: 'Chrome',
//   identity: 'Chrome'
//}
```

**Browser.currentPlatform**

Returns an object containing information about the current platform.

```js
Browser.currentPlatform
// => { string: 'MacIntel', subString: 'Mac', identity: 'Mac' }
```

**Browser.currentVersion**

Returns the version of the current browser based on its userAgent string, in array format.

```js
// Given a user agent like 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'

Browser.currentVersion
// => [62, 0, 3202, 94]
```

**Browser.identity**

Returns the current platform and browser identity (OS + Browser).

```js
// Given a user agent like 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'

Browser.identity
// => {
//   platform: 'Mac',
//   browser: 'Chrome',
//   version: '62.0.3202.94'
// }
```

**Browser.supportsTouchEvents**

Test if this document supports touch, however... There is much discussion about detecting touch on [Modernizr](https://github.com/Modernizr/Modernizr/issues/548). 

```js
Browser.supportsTouchEvents
// => true or false 🤷‍♂️
```

**Browser.isMobile**

Test if this device is mobile, based on its userAgent string.

```js
Browser.isMobile
// => true or false
```

**Browser.isIphone**

Test if this device is an iPhone, based on its userAgent string.

```js
Browser.isIphone
// => true or false
```

**Browser.isAndroid**

Test if this device is an Android, based on its userAgent string.

```js
Browser.isAndroid
// => true or false
```

**Browser.isTablet**

Test if this device is an iPad, based on its userAgent string. The name of the method is quite unfortunate...

```js
Browser.isTablet
// => true or false
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-browser`

