# concorde-clipboard
[![npm version](https://badge.fury.io/js/%40wetransfer%2Fconcorde-clipboard.svg)](https://badge.fury.io/js/%40wetransfer%2Fconcorde-clipboard)

Universal copy to clipboard function for the browser.

## Installation

```sh
npm install @wetransfer/concorde-clipboard --save
```

## Usage

### In the browser

Import the package if your are using a package bundler like Webpack or Parcel. Please notice that some browsers only allow to access the clipboard in response to user interaction:

```js
import { copyToClipboard } from '@wetransfer/concorde-clipboard';

button.addEventListener('click', async function copy() {
  try {
    await copyToClipboard('Your content goes here');
    console.log('Text copied to the clipboard!');
  } catch(error) {
    console.error('We couldn\'t copy to the clipboard', error);
  }
});
```

Or load directly the final bundle on your browser, using a script tag. All concorde.js modules will be available in a global variable called `WT`:

```html
<!-- This will load the latest version of @wetransfer/concorde-clipboard module -->
<script src="https://unpkg.com/@wetransfer/concorde-clipboard/dist/concorde-clipboard.min.js"></script>
<script>
  button.addEventListener('click', async function copy() {
    try {
      await WT.clipboard.copyToClipboard('Your content goes here');
      console.log('Text copied to the clipboard!');
    } catch(error) {
      console.error('We couldn\'t copy to the clipboard', error);
    }
  });
</script>
```

## Functions

**isClipboardSupported**

Returns `true` if [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is supported or [Document.execCommand('copy')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) can be used. Please be aware that even if these methods are available, we cannot guarantee that content can be copied to the clipboard.

```js
console.log('Is clipboard supported? ', isClipboardSupported());
```

**copyToClipboard**

Copy the provided text to the user's clipboard. This function returns a promise that resolves if we can copy to the clipboard. We will try to use the Clipboard API first, and fallback to Document.execCommand if something goes wrong. We will reject the promise if we cannot copy the text to the clipboard.

```js
button.addEventListener('click', async function copy() {
  try {
    await copyToClipboard('Your content goes here');
    console.log('Text copied to the clipboard!');
  } catch(error) {
    console.error('We couldn\'t copy to the clipboard', error);
  }
});
```

## Development

In case you want to develop/debug this module while integrating with other project, please follow these steps:

* Run `npm link` to create a global symlink to that module
* Run `npm run build:watch` to listen to changes and rebuild the module
* Link to this module from your project with `npm link @wetransfer/concorde-clipboard`

