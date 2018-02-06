// import moxios from 'moxios';

import request from '../index';

describe('Request module', () => {
  // beforeEach(() => {
  //   moxios.install();
  // });

  // afterEach(() => {
  //   moxios.uninstall();
  // });

  describe('queryString method', () => {
    it('should create an emtpy query string', () => {
      expect(request.queryString()).toBe('');
    });

    it('should create a query string with one key/value', () => {
      expect(request.queryString({ bar: 'foo' })).toBe('bar=foo');
    });

    it('should create a query string with multiple keys/values', () => {
      expect(request.queryString({ bar: 'foo', foo: 'bar' })).toBe('bar=foo&foo=bar');
    });

    it('should create an emtpy query string', () => {
      expect(request.queryString()).toBe('');
      // moxios.stubRequest('/foo/bar', {
      //   status: 200,
      //   responseText: 'hello'
      // });

      // request.get('/foo/bar').then(() => {
      //   console.log('done');
      //   done();
      // }).catch((e) => {
      //   console.log('error', e);
      //   done();
      // });
    });
  });
});
