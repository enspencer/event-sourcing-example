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
 * @returns promise<Express App>
 */

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'default';
}

var express = require('express');
var _ = require('lodash');
var Q = require('q');
var config = require('./config');
port = process.env.PORT || config.get('PORT');

var app = express();

try {
  require('./mongo').connect()
    .then(function() {
      app.set('port', port);

      app.server = app.listen(port, function() {
        console.log('Express server listening on port %d', port);

        // Hook up the event store to mongo
        require('./eventstore');
      });

    });

} catch (err) {
  console.log('Mongo failed to connect: %s', err.message);
  console.log(err.stack);
}

module.exports = app;