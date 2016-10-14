import test from 'ava';
import Browser from '../index';
import sinon from 'sinon';

Browser.__Rewire__('Search', {
	browser: () => {
		return {
			identity: 'Explorer',
			subString: 'MSIE',
			platform: 'Win32',
			userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
			appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
		}
	},
	version: () => {
		return [53, 0, 2785, 143];
	},
	platform: () => {
		return {
			string: "MacIntel", 
			subString: "Mac", 
			identity: "Mac"
		}
	}
});

test('#currentBrowser should return the currentBrowser', t => {
	t.deepEqual(Browser.currentBrowser, {
		identity: 'Explorer',
		subString: 'MSIE',
		platform: 'Win32',
		userAgent: 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)',
		appVersion: '5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
	})
});

test('#currentVersion should return the current browser Version', t => {
	t.deepEqual(Browser.currentVersion, [53, 0, 2785, 143]);
});

test('#currentPlatform should return the current browser Version', t => {
	t.deepEqual(Browser.currentPlatform, {
		string: "MacIntel", 
		subString: "Mac", 
		identity: "Mac"
	});
});

test('#oneOf should return whether the browser is one of a list', t => {
	var stub = sinon.stub(Browser, 'matches');
	stub.onThirdCall().returns(true);
	t.true(Browser.oneOf([
		'explorer >= 9.0',
		'chrome >= 43',
		'firefox >= 42',
		'safari >= 5'
		]));

	stub.onFirstCall().returns(false);
	t.false(Browser.oneOf('explorer >= 9.0'));

	stub.restore();
	t.false(Browser.oneOf());
});

test('#identity should return browser identity', t => {
	t.deepEqual(Browser.identity(), {
		platform: "Mac",
		browser: "Explorer",
		version: "53.0.2785.143"
	});

	var stub = sinon.stub(Browser, 'currentVersion', {
		get() {
			return '234';
		}
	});
	
	t.deepEqual(Browser.identity(), {
		platform: "Mac",
		browser: "Explorer",
		version: "234"
	});

	stub.restore();
});

test('#platform should test if this is the platform you would expect', t => {
	t.true(Browser.platform('mac'));
	t.false(Browser.platform('windows'));
});

test('#isMobile should check whether the device is... mobile', t => {
	navigator = {
		userAgent: 'IEMobile'
	};

	t.true(Browser.isMobile);

	navigator = {
		userAgent: 'Chrome'
	};

	t.false(Browser.isMobile);
});

test('#isTablet should check whether the device is a tabletDevice', t => {
	navigator = {
		userAgent: 'iPad'
	};

	t.true(Browser.isTablet);

	navigator = {
		userAgent: 'notAnTablet'
	};

	t.false(Browser.isTablet);
});

test('#supportsTouchEvents should test if the platform supports touch', t => {
	var stub = sinon.stub(Browser, 'isTablet', {
		get() { 
				return true 
			}	
	});
	window.ontouchstart = true;
	t.true(Browser.supportsTouchEvents);
	delete window.ontouchstart;
	t.falsy(Browser.supportsTouchEvents);
});


test('#matches should return whether our query matches our current browser (and version)', t => {
	var stub = sinon.stub(Browser, 'currentVersion', {
		get() { 
				return '9.0' 
			}	
	});
	t.true(Browser.matches('explorer = 9.0'));
	t.true(Browser.matches('explorer == 9.0'));
	t.true(Browser.matches('explorer >= 9.0'));
	t.true(Browser.matches('explorer <= 9.0'));
	t.true(Browser.matches('explorer'));
	t.false(Browser.matches('explorer < 9.0'));
	t.false(Browser.matches('explorer > 9.0'));
	t.false(Browser.matches('foobar > 9.0'));
});