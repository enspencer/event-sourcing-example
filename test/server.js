process.env.NODE_ENV = 'test';

var assert = require('assert'),
  _ = require('lodash'),
  config = require('../config');

describe('server.js', function() {
  describe('startServer', function() {
    it('should set the port correctly', function(done) {
      EXPECTED_PORT = process.env.PORT || config.get('PORT');
      require('../server')
      .then(function(app) {
        assert.equal(app.settings.port, EXPECTED_PORT);
        done();
      });
    });
  });
});
