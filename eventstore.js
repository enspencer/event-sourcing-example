var es = require('eventstore')({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  dbName: 'eventstore'
});

es.init(function(err) {
  console.log('connection is up!!!!');
});

es.on('connect', function() {
  console.log('storage connected');
});

es.on('disconnect', function() {
  console.log('disconnect from storage');
});

module.exports = es;

// es.getEventStream('streamId', function(err, stream) {
//   // read from queue
//   console.log('writing to db');
//   stream.addEvent({
//     my: 'event'
//   });

//   stream.commit();
//   console.log(stream);
// });
