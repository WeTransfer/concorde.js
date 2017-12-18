'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./concorde-browser.production.min.js');
} else {
  module.exports = require('./concorde-browser.development.js');
}
