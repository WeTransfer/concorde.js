'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./concorde-cookie.js');
} else {
  module.exports = require('./concorde-cookie.min.js');
}
