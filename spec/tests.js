import test from 'ava';
import Cookie from '../index';
import sinon from 'sinon';
import Merge from 'deepmerge';

var mergeSpy = sinon.spy();
Cookie.__Rewire__('Merge', (defaultOptions, options) => {
  mergeSpy(defaultOptions, options);
  return Merge(defaultOptions, options);
});

test.beforeEach('setEnvironment', () => {
  global.document = {
    cookie: ''
  };
  mergeSpy.reset();
});

test('should be able to read cookies', t => {
  document.cookie = 'test=foobar';
  t.is('foobar', Cookie.get('test'));
});

test('should be able to read cookies raw', t => {
  document.cookie = 'test=foo%20bar';
  t.is('foo bar', Cookie.get('test'));
  t.is('foo%20bar', Cookie.get('test', {raw: true}));
});

test('should be able to read cookies with default value fallback', t => {
  document.cookie = 'test=foo%20bar';
  t.is('foo bar', Cookie.get('test'));
  t.is('haha', Cookie.get('othertest', {defaultValue: 'haha'}));
});

test('should return defaultValue if document.cookie is undefined', t => {
  document.cookie = null;
  t.is('defaultFoo', Cookie.get('test', {defaultValue: 'defaultFoo'}));
});

test('should be able to set simple cookie', t => {
  Cookie.set('foo', 'bar');
  t.true(mergeSpy.calledOnce);
  t.is('foo=bar', document.cookie);
});

test('should be able to set cookie raw', t => {
  Cookie.set('foo test', 'bar', {raw: 'true'});
  t.is('foo%20test=bar', document.cookie);
});

test('should be able to set simple secure cookie', t => {
  Cookie.set('foo', 'bar', {secure: true});
  t.is('foo=bar; secure', document.cookie);
});

test('should be able to set simple cookie with path', t => {
  Cookie.set('foo', 'bar', {path: '/thing'});
  t.is('foo=bar; path=/thing', document.cookie);
});

test('should be able to set simple cookie with domain', t => {
  Cookie.set('foo', 'bar', {domain: 'example.com'});
  t.is('foo=bar; domain=example.com', document.cookie);
});

test('should be able to set simple cookie with expires', t => {
  var expire = new Date('Fri, 01 Jan 2016 09:05:12 GMT');
  Cookie.set('foo', 'bar', {expires: expire});
  t.is('foo=bar; expires=Fri, 01 Jan 2016 09:05:12 GMT', document.cookie);
});

test('should be able to set simple cookie with expire in days', t => {
  var now = new Date();
  Cookie.set('foo', 'bar', {days: 2});
  now.setDate(now.getDate() + 2);
  t.is('foo=bar; expires=' + now.toUTCString(), document.cookie);
});

test('should be able to set simple cookie with expire in more than month in days', t => {
  var now = new Date();
  Cookie.set('foo', 'bar', {days: 32});
  now.setDate(now.getDate() + 32);
  t.is('foo=bar; expires=' + now.toUTCString(), document.cookie);
});

test('should be able to remove a cookie', t => {
  Cookie.set('foo', 'bar');
  t.is('foo=bar', document.cookie);

  var spy = sinon.spy(Cookie, 'set');
  Cookie.unset('foo');
  t.true(spy.calledOnce);
  t.true(spy.calledWith('foo', null, {}));
  t.true(!!document.cookie.match(/foo=null; expires=(.+)/));

  var date = document.cookie.match(/foo=null; expires=(.+)/);
  var expire = new Date(date[1]);
  t.true(expire < Date.now(), 'expiry should be in past');
});

test('should configure the defaultOptions', t => {
  Cookie.configure({path: '/cat'});
  t.true(mergeSpy.calledOnce);
  Cookie.set('foo', 'bar');
  t.is(document.cookie, 'foo=bar; path=/cat');
  Cookie.configure({});
});