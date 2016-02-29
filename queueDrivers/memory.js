// This is an in-memory message queue mock for use in testing.
var hat = require('hat'),
  _ = require('underscore');

MemoryQueueDriver = function() {
  this.queue = [];
  this.hidden = [];
  this.defaultVisibility = 60;
// setInterval(
//   this.checkVisibility(), 1000
// );
};

MemoryQueueDriver.prototype.write = function(body) {
  return new Promise(function(resolve, reject) {
    var msgId = hat(64);
    var message = {
      messageId: msgId,
      payload: body
    };

    this.queue.push(message);
    resolve(msgId);
  }.bind(this));
};

MemoryQueueDriver.prototype.read = function() {
  return new Promise(function(resolve, reject) {
    var msg = this.queue.shift();

    if (!msg) {
      return Promise.resolve();
    }

    var receiptHandle = hat(64),
      returned = _.clone(msg);

    returned.ReceiptHandle = receiptHandle;
    msg.ReceiptHandle = receiptHandle;
    msg.visibilityTimeout = this.defaultVisibility;

    this.hidden.push(msg);
    resolve(returned);
  }.bind(this));
};

// MemoryQueueDriver.prototype.checkVisibility = function() {

// };
//
module.exports = MemoryQueueDriver;