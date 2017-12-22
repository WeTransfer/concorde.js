'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./concorde-cookie.production.min.js');
} else {
  module.exports = require('./concorde-cookie.development.js');
}
