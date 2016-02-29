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
  mongo = require('./mongo');
// port as global variable
APP_PORT = process.env.PORT || config.get('PORT');

// function startServer that returns a promise
var startServer = function() {
  var app = express();
  return mongo.connect()
  .then(function() {
    app.set('port', APP_PORT);
    app.server = app.listen(APP_PORT, function() {
      require('./eventstore');
    });
    return app;
  })
  .catch(function(err) {
    console.log(err);
    console.log("failure");
  });
};

module.exports = startServer();
