import Search from '../search';
import Config from '../config';

const defaultNavigator = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  platform: 'MacIntel'
};

const setNavigator = (userAgent) => {
  Object.defineProperty(global.navigator, 'userAgent', {
    writable: true,
    value: userAgent
  });
};

const setConfig = (navigator) => {
  Config.browser = [
    {
      string: navigator.userAgent,
      subString: 'Edge/',
      identity: 'Edge',
      versionSearch: 'Edge'
    },
    {
      string: navigator.userAgent,
      subString: 'Chrome',
      identity: 'Chrome'
    },
    {
      prop: window.opera,
      identity: 'Opera'
    }
  ];
  Config.platform = [
    {
      string: navigator.platform,
      subString: 'Win',
      identity: 'Windows'
    },
    {
      string: navigator.platform,
      subString: 'Mac',
      identity: 'Mac'
    }
  ];
};

describe('Browser search module', () => {
  it('#platform should return platforms that match current platform', () => {
    setConfig(defaultNavigator);
    expect(Search.platform()).toEqual({ string: 'MacIntel', subString: 'Mac', identity: 'Mac' });
  });

  it('#platform should return unknown when there are no matches', () => {
    setConfig({});
    expect(Search.platform()).toEqual({ identity: 'unknown' });
  });

  it('#browser should return browsers that match current platform ', () => {
    setConfig(defaultNavigator);
    expect(Search.browser()).toEqual({
      string:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
      subString:'Chrome',
      identity:'Chrome'
    });
  });

  it('#browser should recognize opera', () => {
    window.opera = true;
    setConfig({});
    expect(Search.browser()).toEqual({ prop:true, identity:'Opera' });
  });

  xit('#version should return current/specific browser version', () => {
    global.navigator = {
      userAgent: defaultNavigator.userAgent
    };

    const browser = {
      userAgent: navigator.userAgent,
      identity: 'Chrome',
      version: '3289'
    };

    Search.browser = jest.fn().mockReturnValue(browser);
    expect(Search.version(browser)).toEqual([53,0,2785,143]);
  });

  it('#version should return unknown if no matches are found', () => {
    global.navigator = {
      userAgent: 'bar',
      appVersion: 'foobar'
    };

    const browser = {
      userAgent: 'foo'
    };

    Search.browser = jest.fn().mockReturnValue(browser);
    expect(Search.version(browser)).toBe('unknown');
  });
});
