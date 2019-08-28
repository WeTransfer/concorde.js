let shadowTextArea;
let lazyRange;

export function isClipboardSupported() {
  return navigator.clipboard !== undefined || document.execCommand !== undefined;
}

export function copyToClipboard(text) {
  // Fallback to document.execCommand if Clipboard API is not available
  // or Permissions API is not available.
  if (!navigator.clipboard || !navigator.permissions) {
    return writeLegacy(text);
  }

  // Check if we can write into the clipboard
  return navigator.permissions
    .query({ name: 'clipboard-write' })
    .then(({ state }) => ['granted', 'prompt'].includes(state))
    .then((canWrite) => {
      if (canWrite) {
        return navigator.clipboard.writeText(text);
      }

      // Fallback to document.execCommand if something goes wrong.
      return writeLegacy(text);
    })
    .catch(() => writeLegacy(text));
}

function writeLegacy(text) {
  return new Promise((resolve, reject) => {
    const activeElement = document.activeElement;
    const textArea = getTextArea();

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      // Without this `setTimeout` the page on iOS twitches/jumps up and down
      setTimeout(selectAndCopy, 0, { textArea, text, activeElement, resolve, reject });
    } else {
      selectAndCopy({ textArea, text, activeElement, resolve, reject });
    }
  });
}

function getTextArea() {
  if (!shadowTextArea) {
    shadowTextArea = document.createElement('textarea');
    shadowTextArea.style.cssText = `
      position: absolute;
      left: -4444px;
      zIndex: -1;
      opacity: 0.01;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: 0;
      border: 0;
    `;

    // Without readOnly attribute, iOS (may be others as well) will show
    // a popup hint with actions like "select all", "copy" and so on.
    // It will also show the keyboard, which is not desired.
    shadowTextArea.readOnly = true;

    // To be able to use `document.execCommand` the element
    // must be inside the form or contentEditable.
    // At least the documentation says so.
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    // In fact it also works without contentEditable,
    // but usually it is better to follow the documentation :)
    shadowTextArea.contentEditable = 'true';
    shadowTextArea.tabIndex = -1;
    document.body.appendChild(shadowTextArea);
  }

  // Position the text area in a visible part of the page,
  // so the page does not quickly "jump" to the position of the text area
  // and then back to it's previous position.
  // This is needed because the text area needs to be focused
  // when document.execCommand is being executed.
  shadowTextArea.style.top = `${document.body.scrollTop}px`;

  return shadowTextArea;
}

function getRange() {
  if (!lazyRange) {
    lazyRange = document.createRange();
  }

  return lazyRange;
}

function selectAndCopy({
  textArea,
  text,
  activeElement,
  resolve,
  reject,
}) {
  const range = getRange();

  textArea.focus();
  textArea.value = text;
  range.selectNodeContents(textArea);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  textArea.setSelectionRange(0, text.length);

  const isCopied = document.execCommand('copy');

  if (activeElement) {
    activeElement.focus();
  }

  if (isCopied) {
    resolve();
  } else {
    reject(new DOMException('The request is not allowed', 'NotAllowedError'));
  }
}
