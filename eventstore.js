var es = require('eventstore')({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  dbName: 'eventstore'
});
EventStore = function(options) {
  this.esStore = require('eventstore')(options);
};

EventStore.prototype.connect = function() {
  return new Promise(function(resolve, reject) {
    this.esStore.init(resolve);
    this.esStore.on('connect', function() {
      console.log("Connected to EventStore");
    });
    this.esStore.on('disconnect', reject);
  }.bind(this));
};

module.exports = EventStore;

// es.getEventStream('streamId', function(err, stream) {
//   // read from queue
//   console.log('writing to db');
//   stream.addEvent({
//     my: 'event'
//   });

//   stream.commit();
//   console.log(stream);
// });
