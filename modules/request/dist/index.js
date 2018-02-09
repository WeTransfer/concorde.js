'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./concorde-request.js');
} else {
  module.exports = require('./concorde-request.min.js');
}
