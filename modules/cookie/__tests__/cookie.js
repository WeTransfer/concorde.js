import Cookie from '../index';

describe('Cookie module', () => {
  // https://github.com/facebook/jest/issues/890
  Object.defineProperty(global.document, 'cookie', {
    writable: true
  });

  beforeEach(() => {
    global.document.cookie = '';
    Cookie.configure({});
  });

  describe('get() method', () => {
    it('should  read a key value from cookie', () => {
      global.document.cookie = 'test=foobar';
      expect(Cookie.get('test')).toEqual('foobar');
    });

    it('should read a raw value from cookie', () => {
      global.document.cookie = 'test=foo%20bar';
      expect(Cookie.get('test')).toEqual('foo bar');
      expect(Cookie.get('test', { raw: true })).toEqual('foo%20bar');
    });

    it('should read cookies with default value fallback', () => {
      global.document.cookie = 'test=foo%20bar';
      expect(Cookie.get('othertest', { defaultValue: 'haha' })).toEqual('haha');
    });

    it('should return defaultValue if document.cookie is undefined', () => {
      expect(Cookie.get('test', { defaultValue: 'defaultFoo' })).toEqual('defaultFoo');
    });

    it('should return null if cookie does not exist and default value is not provided', () => {
      expect(Cookie.get('test')).toEqual(null);
    });
  });

  describe('set() method', () => {
    it('should be able to set simple value', () => {
      Cookie.set('foo', 'bar');
      expect(document.cookie).toEqual('foo=bar');
    });

    it('should be able to set raw values', () => {
      Cookie.set('foo test', 'bar', { raw: 'true' });
      expect(document.cookie).toEqual('foo%20test=bar');
    });

    it('should be able to set secure cookie values', () => {
      Cookie.set('foo', 'bar', { secure: true });
      expect(document.cookie).toEqual('foo=bar; secure');
    });

    it('should be able to set a value with path', () => {
      Cookie.set('foo', 'bar', { path: '/thing' });
      expect(document.cookie).toEqual('foo=bar; path=/thing');
    });

    it('should be able to set simple cookie with domain', () => {
      Cookie.set('foo', 'bar', { domain: 'example.com' });
      expect(document.cookie).toEqual('foo=bar; domain=example.com');
    });

    it('should be able to set simple cookie with expires', () => {
      const expires = new Date('Fri, 01 Jan 2016 09:05:12 GMT');
      Cookie.set('foo', 'bar', { expires });
      expect(document.cookie).toEqual('foo=bar; expires=Fri, 01 Jan 2016 09:05:12 GMT');
    });

    it('should be able to set simple cookie with expire in days', () => {
      const now = new Date();
      Cookie.set('foo', 'bar', { days: 2 });
      now.setDate(now.getDate() + 2);
      expect(document.cookie).toEqual('foo=bar; expires=' + now.toUTCString());
    });

    it('should be able to set simple cookie with expire in more than month in days', () => {
      const now = new Date();
      Cookie.set('foo', 'bar', { days: 32 });
      now.setDate(now.getDate() + 32);
      expect(document.cookie).toEqual('foo=bar; expires=' + now.toUTCString());
    });

    it('should override default options', () => {
      Cookie.configure({ secure: true });
      Cookie.set('secure', 'false', { secure: false });
      expect(document.cookie).toEqual('secure=false');
    });
  });

  describe('unset() method', () => {
    it('should remove a value', () => {
      Cookie.set('foo', 'bar');
      Cookie.unset('foo');
      expect(/foo=null; expires=(.+)/.test(document.cookie)).toBe(true);

      const date = document.cookie.match(/foo=null; expires=(.+)/);
      const expire = new Date(date[1]);
      expect(expire < Date.now()).toBe(true);
    });

    it('should remove a value and extra options', () => {
      Cookie.set('foo', 'bar', { secure: true });
      Cookie.unset('foo');
      expect(/foo=null; expires=(.+)/.test(document.cookie)).toBe(true);

      const date = document.cookie.match(/foo=null; expires=(.+)/);
      const expire = new Date(date[1]);
      expect(expire < Date.now()).toBe(true);
    });
  });

  describe('configure() method', () => {
    it('should configure default options', () => {
      Cookie.configure({ path: '/cat' });
      Cookie.set('foo', 'bar');
      expect(document.cookie).toEqual('foo=bar; path=/cat');
    });
  });
});
