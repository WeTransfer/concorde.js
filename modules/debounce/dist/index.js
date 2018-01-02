'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./concorde-debounce.production.min.js');
} else {
  module.exports = require('./concorde-debounce.development.js');
}
