# concorde.js
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/371cbb95f8404206928c96769a7e5de1)](https://www.codacy.com/app/WeTransfer/concorde.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=WeTransfer/concorde.js&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/371cbb95f8404206928c96769a7e5de1)](https://www.codacy.com/app/WeTransfer/concorde.js?utm_source=github.com&utm_medium=referral&utm_content=WeTransfer/concorde.js&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/WeTransfer/concorde.js.svg?branch=master)](https://travis-ci.org/WeTransfer/concorde.js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A sexy pinnacle of engineering that’s nonetheless incredibly inefficient and expensive and goes out of business because it can’t find enough use. It also provides some tools to deal with the browser.

## Packages

This repository contains a collection of modules used internally by WeTransfer to build our website. You can use them all together or individually, based on your needs.

| Package | Version | Description |
|---------|---------|-------------|
| [concorde-browser](https://github.com/WeTransfer/concorde.js/tree/master/modules/browser) | [![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-browser) | Browser capabilities detection |
| [concorde-cookie](https://github.com/WeTransfer/concorde.js/tree/master/modules/cookie) | [![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-cookie.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-cookie) | Read, write and clean cookies |
| [concorde-debounce](https://github.com/WeTransfer/concorde.js/tree/master/modules/debounce) | [![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-debounce.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-debounce) | Debounce functions for regular and async functions |

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

## Release process

First, make sure that you have an NPM account at https://www.npmjs.com/, and you are part of the WeTransfer developer's team. Use `npm login` to store the credentials on the client aka, your computer. Check that your authentication token for `registry.npmjs.org` is part of your `~/.npmrc` file.

We use `lerna` to manage our monorepo, and publishing new versions of our modules is also part `lerna`'s responsability. Please run `npm run semantic-release` to publish a new version(s), it should do the following:

* Checkout master, pull and rebase last changes
* Create a new branch to release from
* `lerna` will publish to NPM only the modules that changed since the last commit
* Push the changes to GitHub (changelog and new package version)

It's still your responsability as a developer to create the PR on GitHub and ask a maintainer to merge it.

### What if something goes wrong?

In the unlikely event of a broken release process or water landing, it is still possible to publish the modules manually to NPM. Please follow these steps:

* Create a new branch: `git checkout -b release`
* Change directory to the module you want to publish: `cd modules/foo`
* Bump the version of the package. You must decide if it is mayor, minor or patch.
* Update the CHANGELOG.md file.
* Commit your changes: `git add package.json CHANGELOG.md && git commit -m "chore(release): npm publish 📦 [ci-skip]"`
* Create a new tag with the new version: `git tag -a @wetransfer/concorde-module@version -m "@wetransfer/concorde-module@version"`
* Release the module to NPM: `npm publish`
* Repeat with the rest of the modules, if any.
* Push your changes: `git push --no-verify --follow-tags --set-upstream origin feature`

## License

`concorde.js` is available under the MIT license. See the [LICENSE](https://github.com/WeTransfer/concorde.js/blob/master/LICENSE) file for more info.
