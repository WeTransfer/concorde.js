import test from 'ava';
import Search from '../search';
import sinon from 'sinon';

var defaultNavigator = {
	userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
	platform: 'MacIntel'
}

var setConfig = (navigator) => {
	Search.__Rewire__('Config', {
		browser: [
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
    },
		],
		platform: [
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
		]
	});
}

test('#platform should return platforms that match current platform', t => {
	setConfig(defaultNavigator);
	t.deepEqual(Search.platform(), { string: 'MacIntel', subString: 'Mac', identity: 'Mac' });
})

test('#platform should return unknown when there are no matches', t => {
	setConfig({});
	t.deepEqual(Search.platform(), {identity: 'unknown'});
});

test('#browser should return browsers that match current platform ', t => {
	setConfig(defaultNavigator)
	t.deepEqual(Search.browser(), {
		string:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
		subString:"Chrome",
		identity:"Chrome"
	});
});

test('#browser should recognize opera', t => {
	window.opera = true;
	setConfig({});
	t.deepEqual(Search.browser(), {prop:true,identity:"Opera"});
});

test('#version should return current/specific browser version.', t => {
	navigator = {
		userAgent: defaultNavigator.userAgent
	};

	var browser = {
		userAgent: navigator.userAgent,
		identity: 'Chrome',
		version: "3289"
	};

	var stub = sinon.stub(Search, 'browser').returns(browser);
	t.deepEqual(Search.version(browser), [53,0,2785,143]);
	stub.restore();
});

test('#version should return unknown if no matches are found.', t => {
	navigator = {
		userAgent: 'bar',
		appVersion: 'foobar'
	};

	var browser = {
		userAgent: 'foo',
	};

	var stub = sinon.stub(Search, 'browser').returns(browser);
	t.deepEqual(Search.version(browser), 'unknown');
});