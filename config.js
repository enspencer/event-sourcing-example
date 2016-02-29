var _ = require('lodash'),
  fs = require('fs'),
  filename = process.env.NODE_ENV,
  config = require('./config/' + filename);

module.exports = {
  get: function(key) {
    if (key === 'env') {
      return ENV;
    } else {
      return config[key];
    }
  },
  set: function(key, value) {
    config[key] = value;
  }
};
