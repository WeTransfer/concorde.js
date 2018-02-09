import { queryString } from '../index';

describe('Request module', () => {
  describe('queryString method', () => {
    it('should create an emtpy query string', () => {
      expect(queryString()).toBe('');
    });

    it('should create a query string with one key/value', () => {
      expect(queryString({ bar: 'foo' })).toBe('bar=foo');
    });

    it('should create a query string with multiple keys/values', () => {
      expect(queryString({ bar: 'foo', foo: 'bar' })).toBe('bar=foo&foo=bar');
    });

    it('should create an emtpy query string', () => {
      expect(queryString()).toBe('');
    });
  });
});
