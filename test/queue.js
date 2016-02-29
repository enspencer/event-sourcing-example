process.env.NODE_ENV = 'test';

var assert = require('assert'),
  _ = require('lodash'),
  config = require('../config'),
  mongo = require('../mongo'),
  MemoryDriver = require('../queueDrivers/memory');

describe('Queue drivers', function() {
  describe('SQS', function() {
    beforeEach(function(done) {
      return mongo.connect()
        .then(function() {
          done();
        });
    });
    it('should write to the queue', function(done) {
      var driver = new MemoryDriver();
      return driver.write({
        type: 'nameChanged',
        payload: {
          nameFirst: 'Emma'
        }
      }).then(function() {
        // read from queue
        driver.read().then(function(msg) {
          assert.equal(msg.payload.type, 'nameChanged');
          done();
        });
      })
        .catch(function(err) {
          throw new Error('Should not get here');
        });
    });
  });
});
