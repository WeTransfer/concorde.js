'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./concorde-debounce.js');
} else {
  module.exports = require('./concorde-debounce.min.js');
}
