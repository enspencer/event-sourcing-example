process.env.NODE_ENV = 'test';

var assert = require('assert'),
  _ = require('lodash'),
  config = require('../config'),
  EventStore = require('../EventStore');

var ESFakeOptions = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    dbName: 'eventstore'
  };

describe('eventstore.js', function() {
  describe('EventStore', function() {
    it('should initialize properly with options', function() {
      var eventStore = new EventStore(ESFakeOptions);
      var esOptions = eventStore.esStore.options;
      assert.equal(esOptions.type, ESFakeOptions.type);
      assert.equal(esOptions.port, ESFakeOptions.port);
      assert.equal(esOptions.host, ESFakeOptions.host);
    });
    // it('should connect properly to the mongodb', function(done) {
    //   eventStore = new EventStore(ESFakeOptions);
    //   return eventStore.connect()
    //   .then(function() {
    //     done();
    //   });
    // });
  });
});
