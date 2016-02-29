process.env.NODE_ENV = 'test';

var assert = require('assert'),
  _ = require('lodash'),
  config = require('../config'),
  mongo = require('../mongo');

describe('mongo.js', function() {
  describe('connect', function() {
    it('should connect to mongo db correctly', function(done) {
      // connect to mongo
      return mongo.connect()
      .then(function() {
        // if it resolves then we are done, failure case is timeout
        done();
      });
    });
    it('should properly reject failure', function(done) {
      // save the mongoURL to reset it
      var oldMongoURL = config.get('MONGO_URL_EVENTSTORE');
      // set the URL to a nonsense URL
      config.set('MONGO_URL_EVENTSTORE', 'foobar');
      // attempt to connect
      return mongo.connect()
      .then(function() {
        // if it resolves then we are done, failure case is timeout
        throw new Error("Mongo.js: Not properly throwing error");
      })
      .catch(function(err) {
        assert.equal(err.name, 'MongoError');
        config.set('MONGO_URL_EVENTSTORE', oldMongoURL);
        done();
      });
    });
  });
});
