// Global navigator settings
Object.defineProperty(global.navigator, 'platform', {
  writable: true,
  value: 'MacIntel'
});

Object.defineProperty(global.navigator, 'userAgent', {
  writable: true,
  value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
});

Object.defineProperty(global.navigator, 'vendor', {
  writable: true,
  value: 'Google Inc.'
});
