import Browser from '../index';

const setNavigator = (userAgent) => {
  global.navigator.userAgent = userAgent;
};

describe('Browser module', () => {
  let mocks;
  beforeEach(() => {
    mocks = createMocks(Browser, 'Search', 'Browser');
    setNavigator('Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)');
    mocks.Search.browser.mockReturnValue({
      identity: 'Explorer',
      subString: 'MSIE',
      platform: 'Win32',
      userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
      appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
    });
    mocks.Search.version.mockReturnValue([53, 0, 2785, 143]);
    mocks.Search.platform.mockReturnValue({
      string: 'MacIntel',
      subString: 'Mac',
      identity: 'Mac'
    });
  });

  describe('#currentBrowser getter', () => {
    it('should return the currentBrowser', () => {
      expect(Browser.currentBrowser).toEqual({
        identity: 'Explorer',
        subString: 'MSIE',
        platform: 'Win32',
        userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
        appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
      });
    });
  });

  describe('#currentVersion getter', () => {
    it('should return the current browser Version', () => {
      expect(Browser.currentVersion).toEqual([53, 0, 2785, 143]);
    });
  });

  describe('#currentPlatform getter', () => {
    it('should return the current browser Version', () => {
      expect(Browser.currentPlatform).toEqual({
        string: 'MacIntel',
        subString: 'Mac',
        identity: 'Mac'
      });
    });
  });

  describe('#oneOf function', () => {
    let browsers = [];
    describe('browser is in the list', () => {
      beforeEach(() => {
        browsers = [
          'explorer >= 9.0',
          'chrome >= 43',
          'firefox >= 42',
          'safari >= 5'
        ];
      });

      it('should return true', () => {
        expect(Browser.oneOf(browsers)).toBe(true);
      });
    });

    describe('browser in NOT in the list', () => {
      beforeEach(() => {
        browsers = ['whatiSThis!? >= 9.0'];
      });

      it('should return false', () => {
        expect(Browser.oneOf()).toBe(false);
      });
    });
  });

  describe('#identity getter', () => {
    it('#identity should return browser identity', () => {
      expect(Browser.identity()).toEqual({
        platform: 'Mac',
        browser: 'Explorer',
        version: '53.0.2785.143'
      });
    });
  });

  describe('#platform function', () => {
    it('#platform should test if this is the platform you would expect', () => {
      expect(Browser.platform('mac')).toBe(true);
      expect(Browser.platform('windows')).toBe(false);
    });
  });

  describe('#isMobile getter', () => {
    describe('navigator is mobile', () => {
      beforeEach(() => {
        setNavigator('IEMobile');
      });

      it('should return true', () => {
        expect(Browser.isMobile).toBe(true);
      });
    });

    describe('navigator is NOT mobile', () => {
      beforeEach(() => {
        setNavigator('Chrome');
      });

      it('should return false', () => {
        expect(Browser.isMobile).toBe(false);
      });
    });
  });

  describe('isIphone getter', () => {
    describe('platform is an iPhone', () => {
      beforeEach(() => {
        Object.defineProperty(global.navigator, 'platform', {
          value: 'iPhone'
        });
      });

      it('should return true', () => {
        expect(Browser.isIphone).toBe(true);
      });
    });

    describe('platform is NOT an iPhone', () => {
      beforeEach(() => {
        Object.defineProperty(global.navigator, 'platform', {
          value: 'Blackberry'
        });
      });

      it('should return false', () => {
        expect(Browser.isIphone).toBe(false);
      });
    });
  });

  describe('#isTablet getter', () => {
    describe('navigator is iPad', () => {
      beforeEach(() => {
        setNavigator('iPad');
      });

      it('should return true', () => {
        expect(Browser.isTablet).toBe(true);
      });
    });

    describe('navigator is NOT iPad', () => {
      beforeEach(() => {
        setNavigator('notATablet');
      });

      it('should return false', () => {
        expect(Browser.isTablet).toBe(false);
      });
    });
  });

  describe('#supportsTouchEvents getter', () => {
    describe('navigator is iPad with touchEvents', () => {
      beforeEach(() => {
        setNavigator('iPad');
        global.ontouchstart = true;
      });

      it('should return true', () => {
        expect(Browser.isTablet).toBe(true);
      });
    });

    describe('navigator is NOT an ipad without touchEvents', () => {
      beforeEach(() => {
        setNavigator('whoop');
        global.ontouchstart = false;
      });

      it('should return true', () => {
        expect(Browser.isTablet).toBe(false);
      });
    });
  });

  describe('#matches function', () => {
    beforeEach(() => {
      Object.defineProperty(Browser, 'currentVersion', {
        get: jest.fn(() => '9.0')
      });
    });

    it('should return whether our query matches our current browser (and version)', () => {
      expect(Browser.matches('explorer = 9.0')).toBe(true);
      expect(Browser.matches('explorer == 9.0')).toBe(true);
      expect(Browser.matches('explorer >= 9.0')).toBe(true);
      expect(Browser.matches('explorer <= 9.0')).toBe(true);
      expect(Browser.matches('explorer')).toBe(true);
      expect(Browser.matches('explorer < 9.0')).toBe(false);
      expect(Browser.matches('explorer > 9.0')).toBe(false);
      expect(Browser.matches('foobar > 9.0')).toBe(false);
    });
  });

  describe('#isOutdated getter', () => {
    describe('navigator is IE10', () => {
      beforeEach(() => {
        setNavigator('Mozilla/5.0 (compatible; MSIE 10.0)');
        mocks.Search.version.mockReturnValue([10]);
      });

      it('should return true', () => {
        expect(Browser.isOutdated([
          'Chrome >= 42',
          'Firefox >= 38',
          'Safari >= 6',
          'Explorer >= 11',
          'Edge >= 12'
        ])).toBe(true);
      });
    });
  });
});
