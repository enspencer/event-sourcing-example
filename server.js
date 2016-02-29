/**
 * Boot the application server
 *
 * Steps are:
 * 1) Connect to the database
 * 3) Configure application
 * 4) Connect to queue
 * 6) Global error handling
 * 7) Start the server
 *
 * @returns Promise<Express App>
 */

// set the node environment
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'default';
}
// node requirements
var express = require('express'),
  _ = require('lodash'),
  config = require('./config'),
  mongo = require('./mongo'),
  EventStore = require('./eventstore');
// port as global variable
APP_PORT = process.env.PORT || config.get('PORT');
// todo add this to the config
EVENT_STORE_OPTIONS = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  dbName: 'eventstore'
};
// function startServer that returns a promise
var startServer = function() {
  var app = express();
  return mongo.connect()
  .then(function() {
    app.set('port', APP_PORT);
    var eventStore = new EventStore(EVENT_STORE_OPTIONS);
    app.server = app.listen(APP_PORT, function() {
      console.log("Application listening on port " + APP_PORT);
    });
    return eventStore.connect()
    .then(function() {
      return app;
    })
    .catch(function(err) {
      console.log(err);
      console.log("Something went wrong! EventStore failed to connect!")
      process.exit(1)
    });
  })
  .catch(function(err) {
    console.log(err);
    console.log("Something went wrong! MongoDB failed to connect!");
    process.exit(1);
  });
};

module.exports = startServer();
