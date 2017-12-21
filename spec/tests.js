import assert from 'assert';
import Cookie from '../index';

describe('Cookie', function(){
  beforeEach(function(){
    global.document = {
      cookie: ''
    }
  });

  it('be able to read cookies', function(){
    document.cookie = 'test=foobar';
    assert.equal('foobar', Cookie.get('test'));
  });

  it('be able to read cookies raw', function(){
    document.cookie = 'test=foo%20bar';
    assert.equal('foo bar', Cookie.get('test'));
    assert.equal('foo%20bar', Cookie.get('test', {raw: true}));
  });

  it('be able to read cookies with default value fallback', function(){
    document.cookie = 'test=foo%20bar';
    assert.equal('foo bar', Cookie.get('test'));
    assert.equal('haha', Cookie.get('othertest', {defaultValue: 'haha'}));
  });

  it('be able to set simple cookie', function(){
    Cookie.set('foo', 'bar');
    assert.equal('foo=bar', document.cookie);
  });

  it('be able to set simple secure cookie', function(){
    Cookie.set('foo', 'bar', {secure: true});
    assert.equal('foo=bar; secure', document.cookie);
  });

  it('be able to set simple cookie with path', function(){
    Cookie.set('foo', 'bar', {path: '/thing'});
    assert.equal('foo=bar; path=/thing', document.cookie);
  });

  it('be able to set simple cookie with domain', function(){
    Cookie.set('foo', 'bar', {domain: 'example.com'});
    assert.equal('foo=bar; domain=example.com', document.cookie);
  });

  it('be able to set simple cookie with expires', function(){
    var expire = new Date('Fri, 01 Jan 2016 09:05:12 GMT');
    Cookie.set('foo', 'bar', {expires: expire});
    assert.equal('foo=bar; expires=Fri, 01 Jan 2016 09:05:12 GMT', document.cookie);
  });

  it('be able to set simple cookie with expire in days', function(){
    var now = new Date();
    Cookie.set('foo', 'bar', {days: 2});
    now.setDate(now.getDate() + 2);
    assert.equal('foo=bar; expires=' + now.toUTCString(), document.cookie);
  });

  it('be able to set simple cookie with expire in more than month in days', function(){
    var now = new Date();
    Cookie.set('foo', 'bar', {days: 32});
    now.setDate(now.getDate() + 32);
    assert.equal('foo=bar; expires=' + now.toUTCString(), document.cookie);
  });

  it('be able to remove a cookie', function(){
    Cookie.set('foo', 'bar');
    assert.equal('foo=bar', document.cookie);
    Cookie.unset('foo');
    assert(!!document.cookie.match(/foo=null; expires=(.+)/));

    var date = document.cookie.match(/foo=null; expires=(.+)/);
    var expire = new Date(date[1]);
    assert(expire < Date.now(), 'expiry should be in past');
  });
});