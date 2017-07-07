import Browser from '../index';
import Search from '../search';
import sinon from 'sinon';

Search.browser = () => {
  return {
    identity: 'Explorer',
    subString: 'MSIE',
    platform: 'Win32',
    userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
    appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
  };
};

Search.version = () => {
  return [53, 0, 2785, 143];
};

Search.platform = () => {
  return {
    string: 'MacIntel',
    subString: 'Mac',
    identity: 'Mac'
  };
};

describe('Browser module', () => {
  it('#currentBrowser should return the currentBrowser', () => {
    expect(Browser.currentBrowser).toEqual({
      identity: 'Explorer',
      subString: 'MSIE',
      platform: 'Win32',
      userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
      appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
    });
  });

  it('#currentVersion should return the current browser Version', () => {
    expect(Browser.currentVersion).toEqual([53, 0, 2785, 143]);
  });

  it('#currentPlatform should return the current browser Version', () => {
    expect(Browser.currentPlatform).toEqual({
      string: 'MacIntel',
      subString: 'Mac',
      identity: 'Mac'
    });
  });

  it('#oneOf should return whether the browser is one of a list', () => {
    const stub = sinon.stub(Browser, 'matches');
    stub.onThirdCall().returns(true);
    expect(Browser.oneOf([
      'explorer >= 9.0',
      'chrome >= 43',
      'firefox >= 42',
      'safari >= 5'
    ])).toBe(true);

    stub.onFirstCall().returns(false);
    expect(Browser.oneOf('explorer >= 9.0')).toBe(false);

    stub.restore();
    expect(Browser.oneOf()).toBe(false);
  });

  it('#identity should return browser identity', () => {
    expect(Browser.identity()).toEqual({
      platform: 'Mac',
      browser: 'Explorer',
      version: '53.0.2785.143'
    });
  });

  it('#platform should test if this is the platform you would expect', () => {
    expect(Browser.platform('mac')).toBe(true);
    expect(Browser.platform('windows')).toBe(false);
  });

  xit('#isMobile should check whether the device is... mobile', () => {
    global.navigator = {
      userAgent: 'IEMobile'
    };

    expect(Browser.isMobile).toBe(true);

    global.navigator = {
      userAgent: 'Chrome'
    };

    expect(Browser.isMobile).toBe(false);
  });

  xit('#isTablet should check whether the device is a tabletDevice', () => {
    global.navigator = {
      userAgent: 'iPad'
    };

    expect(Browser.isTablet).toBe(true);

    global.navigator = {
      userAgent: 'notAnTablet'
    };

    expect(Browser.isTablet).toBe(false);
  });

  xit('#supportsTouchEvents should test if the platform supports touch', () => {
    sinon.stub(Browser, 'isTablet', {
      get() {
        return true;
      }
    });
    global.ontouchstart = true;
    expect(Browser.supportsTouchEvents).toBe(true);
    delete global.ontouchstart;
    expect(Browser.supportsTouchEvents).toBe(false);
  });


  it('#matches should return whether our query matches our current browser (and version)', () => {
    sinon.stub(Browser, 'currentVersion', {
      get() {
        return '9.0';
      }
    });
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
