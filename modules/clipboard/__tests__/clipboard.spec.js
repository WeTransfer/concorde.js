import { isClipboardSupported, copyToClipboard } from '../index';

jest.useFakeTimers();

describe('Clipboard module', () => {
  Object.defineProperty(global.navigator, 'clipboard', {
    writable: true,
    value: undefined,
  });

  Object.defineProperty(global.document, 'execCommand', {
    writable: true,
    value: undefined,
  });

  Object.defineProperty(global.navigator, 'permissions', {
    writable: true,
    value: undefined,
  });

  describe('isClipboardSupported function', () => {
    it('should return false if neither Clipboard API or document.execCommand are available', () => {
      expect(isClipboardSupported()).toBe(false);
    });

    describe('when Clipboard API is available', () => {
      beforeEach(() => {
        global.navigator.clipboard = {};
      });

      it('should return true', () => {
        expect(isClipboardSupported()).toBe(true);
      });
    });

    describe('when document.execCommand available', () => {
      beforeEach(() => {
        global.document.execCommand = jest.fn();
      });

      it('should return true', () => {
        expect(isClipboardSupported()).toBe(true);
      });
    });
  });

  describe('copyToClipboard function', () => {
    let clipboardSpy;
    let permissionsSpy;
    let execCommandSpy;

    beforeEach(() => {
      execCommandSpy = jest.fn(() => true);
      clipboardSpy = { writeText: jest.fn() };
      permissionsSpy = { query: jest.fn() };

      Object.defineProperty(global.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      });

      permissionsSpy.query.mockReturnValue(Promise.resolve({ state: 'granted' }));
      global.navigator.clipboard = clipboardSpy;
      global.navigator.permissions = permissionsSpy;
      global.document.execCommand = execCommandSpy;
      global.document.createRange = jest.fn(() => ({
        selectNodeContents: jest.fn(),
      }));
      global.getSelection = jest.fn(() => ({
        addRange: jest.fn(),
        removeAllRanges: jest.fn(),
      }));
    });

    it('should copy the text using Clipboard API', async () => {
      await copyToClipboard('Text to be copied!');
      expect(clipboardSpy.writeText).toHaveBeenCalledWith('Text to be copied!');
    });

    it('should copy the text using execCommand if no permissions for Clipboard API are available', async () => {
      permissionsSpy.query.mockReturnValue(Promise.resolve({ state: 'denied' }));
      await copyToClipboard('Text to be copied!');
      expect(execCommandSpy).toHaveBeenCalledWith('copy');
    });

    it('should copy the text using execCommand if Permissions API throws an error', async () => {
      permissionsSpy.query.mockReturnValue(Promise.reject({ state: 'denied' }));
      await copyToClipboard('Text to be copied!');
      expect(execCommandSpy).toHaveBeenCalledWith('copy');
    });

    it('should copy the text using execCommand if Clipboard API is not available', async () => {
      global.navigator.clipboard = undefined;
      await copyToClipboard('Text to be copied!');
      expect(execCommandSpy).toHaveBeenCalledWith('copy');
    });

    it('should copy the text using execCommand if Permissions API is not available', async () => {
      global.navigator.permissions = undefined;
      await copyToClipboard('Text to be copied!');
      expect(execCommandSpy).toHaveBeenCalledWith('copy');
    });

    it('should copy the text in the next event loop using execCommand on iOS devices', (done) => {
      global.navigator.permissions = undefined;
      Object.defineProperty(global.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1',
      });
      copyToClipboard('Text to be copied!');
      jest.runAllTimers();
      process.nextTick(() => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(execCommandSpy).toHaveBeenCalledWith('copy');
        done();
      });
    });

    it('should throw an error if execCommand did not succeded', async () => {
      permissionsSpy.query.mockReturnValue(Promise.reject({ state: 'denied' }));
      global.document.execCommand.mockReturnValue(false);
      await expect(copyToClipboard('Text to be copied!')).rejects.toEqual(new DOMException());
    });
  });
});
