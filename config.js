var _ = require('lodash');
var fs = require('fs');
var filename = process.env.NODE_ENV;
var config = require('./config/' + filename);

module.exports = {
  get: function(key) {
    if (key === 'env') {
      return ENV;
    } else {
      return config[key];
    }
  }
};