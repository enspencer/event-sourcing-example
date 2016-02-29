var config = require('./config');
var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'default' || process.env.NODE_ENV === 'testing') {
  mongoose.set('debug', true);
}

var connect = function() {
  // return Promise to be resolved upon connection, or rejected on
  // error or close
  return new Promise(function(resolve, reject) {
    // grab the mongo event store URL
    var eventStoreMongoURL = config.get('MONGO_URL_EVENTSTORE');
    // instantiate a new connection and listen for connection, error, or close
    var eventStoreConnection = mongoose.createConnection(eventStoreMongoURL);
    eventStoreConnection.on('error', reject);
    eventStoreConnection.on('connected', resolve);
    eventStoreConnection.on('close', reject);
  });
};

module.exports = {connect: connect};
