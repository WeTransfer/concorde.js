import sinon from 'sinon';

import Cookie from '../index';

describe('Cookie module', () => {
  beforeEach(() => {
    // https://github.com/facebook/jest/issues/890
    Object.defineProperty(global.document, 'cookie', {
      writable: true,
      value: ''
    });
  });

  it('should be able to read cookies', () => {
    global.document.cookie = 'test=foobar';
    expect('foobar').toEqual(Cookie.get('test'));
  });

  it('should be able to read cookies raw', () => {
    global.document.cookie = 'test=foo%20bar';
    expect('foo bar').toEqual(Cookie.get('test'));
    expect('foo%20bar').toEqual(Cookie.get('test', {raw: true}));
  });

  it('should be able to read cookies with default value fallback', () => {
    global.document.cookie = 'test=foo%20bar';
    expect('foo bar').toEqual(Cookie.get('test'));
    expect('haha').toEqual(Cookie.get('othertest', {defaultValue: 'haha'}));
  });

  it('should return defaultValue if document.cookie is undefined', () => {
    expect('defaultFoo').toEqual(Cookie.get('test', {defaultValue: 'defaultFoo'}));
  });

  it('should be able to set simple cookie', () => {
    Cookie.set('foo', 'bar');
    expect('foo=bar').toEqual(document.cookie);
  });

  it('should be able to set cookie raw', () => {
    Cookie.set('foo test', 'bar', {raw: 'true'});
    expect('foo%20test=bar').toEqual(document.cookie);
  });

  it('should be able to set simple secure cookie', () => {
    Cookie.set('foo', 'bar', {secure: true});
    expect('foo=bar; secure').toEqual(document.cookie);
  });

  it('should be able to set simple cookie with path', () => {
    Cookie.set('foo', 'bar', {path: '/thing'});
    expect('foo=bar; path=/thing').toEqual(document.cookie);
  });

  it('should be able to set simple cookie with domain', () => {
    Cookie.set('foo', 'bar', {domain: 'example.com'});
    expect('foo=bar; domain=example.com').toEqual(document.cookie);
  });

  it('should be able to set simple cookie with expires', () => {
    const expire = new Date('Fri, 01 Jan 2016 09:05:12 GMT');
    Cookie.set('foo', 'bar', {expires: expire});
    expect('foo=bar; expires=Fri, 01 Jan 2016 09:05:12 GMT').toEqual(document.cookie);
  });

  it('should be able to set simple cookie with expire in days', () => {
    const now = new Date();
    Cookie.set('foo', 'bar', {days: 2});
    now.setDate(now.getDate() + 2);
    expect('foo=bar; expires=' + now.toUTCString()).toEqual(document.cookie);
  });

  it('should be able to set simple cookie with expire in more than month in days', () => {
    const now = new Date();
    Cookie.set('foo', 'bar', {days: 32});
    now.setDate(now.getDate() + 32);
    expect('foo=bar; expires=' + now.toUTCString()).toEqual(document.cookie);
  });

  it('should be able to remove a cookie', () => {
    Cookie.set('foo', 'bar');
    expect('foo=bar').toEqual(document.cookie);

    const spy = sinon.spy(Cookie, 'set');
    Cookie.unset('foo');
    expect(spy.calledOnce).toBe(true);
    expect(spy.calledWith('foo', null, {})).toBe(true);
    expect(!!document.cookie.match(/foo=null; expires=(.+)/)).toBe(true);

    const date = document.cookie.match(/foo=null; expires=(.+)/);
    const expire = new Date(date[1]);
    expect(expire < Date.now()).toBe(true);
  });

  it('should configure the defaultOptions', () => {
    Cookie.configure({path: '/cat'});
    Cookie.set('foo', 'bar');
    expect(document.cookie).toEqual('foo=bar; path=/cat');
    Cookie.configure({});
  });
});
