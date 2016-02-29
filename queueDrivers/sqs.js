var _ = require('lodash');
SQS = require('aws-sdk').SQS
Endpoint = require('aws-sdk').Endpoint

var SqsDriver = function(params) {
  queuePath = '/' + config.get('SQS_QUEUE_IDENTIFIER') + '/'
  params = _.extend({}, defaults, params)
  params.queuePath = queuePath + params.queueName
  this.params = params
  endpoint = new Endpoint(params.endpoint)
  this.queue = new SQS({
    accessKeyId: params.accessKey,
    secretAccessKey: params.secretKey,
    region: params.region,
    endpoint: endpoint
  })
};

SqsDriver.prototype.read = function() {};

SqsDriver.prototype.write = function() {};