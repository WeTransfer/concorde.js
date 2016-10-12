import assert from 'assert';

describe('Browser', function(){
  afterEach(function(){
    // Reset because the files read data on load.
    delete require.cache[require.resolve('../index')];
    delete require.cache[require.resolve('../config')];
    delete require.cache[require.resolve('../search')];
  });

  it('should recognise platform', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      vendor: 'Apple Computer, Inc.',
      platform: 'MacIntel',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
      appVersion: '5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'
    }

    global.window = {
      ontouchstart: false
    };
      
    var Browser = require('../index').default;
    assert.equal(true, Browser.platform('mac') === true);
    assert.equal(true, Browser.platform('windows') === false);
  });

  it('should recognise browser', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      vendor: 'Google Inc.',
      platform: 'MacIntel',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
      appVersion: '5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }

    global.window = {
      ontouchstart: false
    };

    var Browser = require('../index').default;
    assert.equal('Mac', Browser.identity().platform);
    assert.equal('Chrome', Browser.identity().browser);
  });

  it('should recognise browser version', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      platform: 'Win32',
      userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
      appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
    }

    global.window = {
      ontouchstart: false
    };

    var Browser = require('../index').default;
    assert.equal('Windows', Browser.identity().platform);
    assert.equal('Explorer', Browser.identity().browser);
    assert.equal(true, Browser.matches('explorer = 9.0'));
  });

  it('should support multiple version operators', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      platform: 'Win32',
      userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
      appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
    }

    global.window = {
      ontouchstart: false
    };

    var Browser = require('../index').default;
    assert.equal(true, Browser.matches('explorer = 9.0'), '=');
    assert.equal(true, Browser.matches('explorer == 9.0'), '==');
    assert.equal(true, Browser.matches('explorer >= 9.0'), '>=');
    assert.equal(true, Browser.matches('explorer <= 9.0'), '<=');
    assert.equal(false, Browser.matches('explorer < 9.0'), '<');
    assert.equal(false, Browser.matches('explorer > 9.0'), '>');
  });

  it('should support know MSIE11', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      platform: 'Win64',
      userAgent: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      appVersion: '5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
    }

    global.window = {
      ontouchstart: false
    };

    var Browser = require('../index').default;
    assert.equal(true, Browser.matches('explorer = 11.0'));
  });

  it('should support know MS EDGE (new IE)', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      platform: 'Win64',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136',
      appVersion: '5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136'
    }

    global.window = {
      ontouchstart: false
    };

    var Browser = require('../index').default;
    assert.equal(true, Browser.matches('edge >= 12'));
  });

  it('should easily be able to check browser support', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      vendor: 'Google Inc.',
      platform: 'MacIntel',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
      appVersion: '5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }

    global.window = {
      ontouchstart: false
    };

    var Browser = require('../index').default;
    assert.equal(true, Browser.oneOf([
      'explorer >= 9.0',
      'chrome >= 43',
      'firefox >= 42',
      'safari >= 5'
    ]));
  });

  it('should support (Safari) versioning', function(){
    // Needs to be defined before Browser is loaded
    global.navigator = {
      vendor: 'Apple Computer, Inc.',
      platform: 'MacIntel',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/602.1.27 (KHTML, like Gecko) Version/9.1.1 Safari/601.6.15',
      appVersion: '5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/602.1.27 (KHTML, like Gecko) Version/9.1.1 Safari/601.6.15'
    }

    var Browser = require('../index').default;
    assert.equal(true, Browser.matches('safari >= 9.1.1'));
    assert.equal(true, Browser.matches('safari >= 9.1'));
    assert.equal(true, Browser.matches('safari > 9.0'));
    assert.equal(true, Browser.matches('safari = 9.1'));
    assert.equal(true, Browser.matches('safari = 9'));
    assert.equal(true, Browser.matches('safari >= 8.0'));
    assert.equal(true, Browser.matches('safari >= 8.5'));
    assert.equal(true, Browser.matches('safari >= 5.3.2'));
    assert.equal(true, Browser.matches('safari <= 9.1.1'));
    assert.equal(false, Browser.matches('safari < 9.1.1'));
    assert.equal(false, Browser.matches('safari <= 9.0'));
    assert.equal(false, Browser.matches('safari >= 10.0'));
    assert.equal(false, Browser.matches('safari >= 100.100.100'));
    assert.equal(false, Browser.matches('safari = 5'));
    assert.equal(false, Browser.matches('safari = 5.1'));
    assert.equal(false, Browser.matches('safari = 5.2.3'));
  });
});