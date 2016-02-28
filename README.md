# event-sourcing-example

Total work in progress. Messing around with [node-eventstore](https://github.com/adrai/node-eventstore) receiving messages from SQS and saving to mongo.

## Setup:
* Clone this repo
* `npm install`
* Copy config/sample.js into a new file config/default.js and add your config values
* Make sure you have mongo running
* Run `node server.js`

## To do:
* Listen to queue
* Persist events to mongo

## Nice to haves:
* Swap mongo for a relational db
* Validation on events
* Create snapshots