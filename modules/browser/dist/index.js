'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./concorde-browser.js');
} else {
  module.exports = require('./concorde-browser.min.js');
}
