'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./concorde-timer.js');
} else {
  module.exports = require('./concorde-timer.min.js');
}
