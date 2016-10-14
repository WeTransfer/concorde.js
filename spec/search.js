import browserEnv from 'browser-env';
browserEnv(['navigator']);

import test from 'ava';
import Search from '../search';

test.beforeEach(t => {
	navigator	= 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36';
});
test('#platform should ', t => {
	console.log(Search.platform());
})