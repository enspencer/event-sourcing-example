var config = require('./config');
var Q = require('q');
var mongoose = require('mongoose-q')(require('mongoose'));

if (process.env.NODE_ENV === 'default' || process.env.NODE_ENV === 'testing') {
  mongoose.set('debug', true);
}

module.exports = {
  connect: function() {
    var deferred = Q.defer();
    console.log(config.get('MONGO_URL_EVENTSTORE'));
    var connection = mongoose.createConnection(config.get('MONGO_URL_EVENTSTORE'));

    connection.on('error', function(error) {
      deferred.reject('Error connecting to mongo %s', error);
    });

    connection.on('connected', function() {
      console.log('Successfully connected to database');
      deferred.resolve();
    });

    connection.on('close', function() {
      deferred.reject('Mongo connection closed');
    });

    return deferred.promise;
  }

};