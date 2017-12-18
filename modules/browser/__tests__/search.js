import { Search } from '../index';

describe('Browser search module', () => {
  beforeEach(() => {
    global.navigator.platform = 'MacIntel';
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';
  });

  describe('platform property', () => {
    it('should contain platforms that match current platform', () => {
      expect(Search.platform).toEqual({
        string: 'MacIntel',
        subString: 'Mac',
        identity: 'Mac'
      });
    });

    it('should contain unknown when there are no matches', () => {
      global.navigator.platform = 'Node.js';
      global.navigator.userAgent =
        'Node.js AppleWebKit/537.36 (KHTML, like Gecko)';
      expect(Search.platform).toEqual({ identity: 'unknown' });
    });
  });

  describe('browser property', () => {
    it('should contain browsers that match current platform ', () => {
      expect(Search.browser).toEqual({
        string:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        subString: 'Chrome',
        identity: 'Chrome'
      });
    });

    it('should recognize opera', () => {
      global.opera = true;
      global.navigator.userAgent = 'OPR/15.0.1147.100';
      expect(Search.browser).toEqual({ prop: true, identity: 'Opera' });
    });
  });

  describe('version() method', () => {
    it('should return current/specific browser version.', () => {
      const browser = {
        userAgent: global.navigator.userAgent,
        identity: 'Chrome',
        version: '3289'
      };
      expect(Search.version(browser)).toEqual([62, 0, 3202, 94]);
    });

    it('should return unknown if no matches are found.', () => {
      const browser = {
        userAgent: 'foo'
      };
      expect(Search.version(browser)).toBe('unknown');
    });
  });
});
