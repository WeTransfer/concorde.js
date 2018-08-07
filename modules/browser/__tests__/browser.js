import Browser from '../index';

describe('Browser module', () => {
  const setNavigator = (userAgent) => {
    global.navigator.userAgent = userAgent;
  };

  beforeEach(() => {
    global.navigator.platform = 'MacIntel';
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';
  });

  describe('currentBrowser property', () => {
    it('should contain the currentBrowser', () => {
      expect(Browser.currentBrowser).toEqual({
        identity: 'Chrome',
        subString: 'Chrome',
        string:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      });
    });

    describe('currentPlatform property', () => {
      it('should contain the current browser Version', () => {
        expect(Browser.currentPlatform).toEqual({
          string: 'MacIntel',
          subString: 'Mac',
          identity: 'Mac',
        });
      });
    });

    describe('currentVersion property', () => {
      it('should contain the current browser Version', () => {
        expect(Browser.currentVersion).toEqual([62, 0, 3202, 94]);
      });
    });

    describe('oneOf() method', () => {
      let browsers = [];

      describe('when browser is in the list', () => {
        beforeEach(() => {
          browsers = [
            'explorer >= 9.0',
            'chrome >= 43',
            'firefox >= 42',
            'safari >= 5',
          ];
        });

        it('should return true', () => {
          expect(Browser.oneOf(browsers)).toBe(true);
        });

        it('should return true if the browser is defined as string', () => {
          expect(Browser.oneOf('chrome >= 43')).toBe(true);
        });
      });

      describe('when browser in not in the list', () => {
        beforeEach(() => {
          browsers = ['whatiSThis!? >= 9.0'];
        });

        it('should return false', () => {
          expect(Browser.oneOf()).toBe(false);
        });
      });
    });

    describe('identity property', () => {
      it('should contain browser identity', () => {
        expect(Browser.identity).toEqual({
          platform: 'Mac',
          browser: 'Chrome',
          version: '62.0.3202.94',
        });
      });

      it('should contain browser identity with no version', () => {
        setNavigator(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit (KHTML, like Gecko)'
        );
        expect(Browser.identity).toEqual({
          platform: 'Mac',
          browser: 'Mozilla',
          version: 'unknown',
        });
      });
    });

    describe('supportsTouchEvents property', () => {
      it('should return false if browser is not mobile or tablet', () => {
        expect(Browser.supportsTouchEvents).toBe(false);
      });

      it('should return true if browser has touch capabilities', () => {
        setNavigator('iPad');
        global.ontouchstart = true;
        expect(Browser.supportsTouchEvents).toBe(true);
      });
    });

    describe('isMobile property', () => {
      describe('when navigator is mobile', () => {
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
          global.navigator.platform = 'iPhone';
        });

        it('should return true', () => {
          expect(Browser.isIphone).toBe(true);
        });
      });

      describe('platform is NOT an iPhone', () => {
        beforeEach(() => {
          global.navigator.platform = 'Blackberry';
        });

        it('should return false', () => {
          expect(Browser.isIphone).toBe(false);
        });
      });
    });

    describe('isAndroid getter', () => {
      describe('when navigator is Android', () => {
        beforeEach(() => {
          global.navigator.userAgent = 'Android';
        });

        it('should contain true', () => {
          expect(Browser.isAndroid).toBe(true);
        });
      });

      describe('navigator is NOT an Android', () => {
        beforeEach(() => {
          global.navigator.userAgent = 'Blackberry';
        });

        it('should return false', () => {
          expect(Browser.isAndroid).toBe(false);
        });
      });
    });

    describe('isTablet property', () => {
      describe('when navigator is iPad', () => {
        beforeEach(() => {
          setNavigator('iPad');
        });

        it('should contain true', () => {
          expect(Browser.isTablet).toBe(true);
        });
      });

      describe('when navigator is NOT iPad', () => {
        beforeEach(() => {
          setNavigator('notATablet');
        });

        it('should contain false', () => {
          expect(Browser.isTablet).toBe(false);
        });
      });
    });

    describe('platform() method', () => {
      it('should return true if it is the platform you would expect', () => {
        expect(Browser.platform('mac')).toBe(true);
      });

      it('should return false if it is not the platform you would expect', () => {
        expect(Browser.platform('windows')).toBe(false);
      });

      it('should return false if platform is not provided', () => {
        expect(Browser.platform()).toBe(false);
      });
    });

    describe('matches() method', () => {
      it('should return whether our query matches our current browser (and version)', () => {
        expect(Browser.matches('chrome = 62.0')).toBe(true);
        expect(Browser.matches('chrome == 62.0')).toBe(true);
        expect(Browser.matches('chrome >= 62.0')).toBe(true);
        expect(Browser.matches('chrome <= 62.0')).toBe(true);
        expect(Browser.matches('chrome')).toBe(true);
        expect(Browser.matches('chrome < 62.0')).toBe(false);
        expect(Browser.matches('chrome > 62.0')).toBe(false);
        expect(Browser.matches('foobar > 62.0')).toBe(false);
      });
    });
  });

  describe('isOutdated property', () => {
    describe('when navigator is IE10', () => {
      beforeEach(() => {
        setNavigator('Mozilla/5.0 (compatible; MSIE 10.0)');
      });

      it('should return true', () => {
        expect(
          Browser.isOutdated([
            'Chrome >= 42',
            'Firefox >= 38',
            'Safari >= 6',
            'Explorer >= 11',
            'Edge >= 12',
          ])
        ).toBe(true);
      });
    });
  });
});
