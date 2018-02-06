'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./concorde-request.production.min.js');
} else {
  module.exports = require('./concorde-request.development.js');
}
