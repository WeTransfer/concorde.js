'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./concorde-clipboard.js');
} else {
  module.exports = require('./concorde-clipboard.min.js');
}
