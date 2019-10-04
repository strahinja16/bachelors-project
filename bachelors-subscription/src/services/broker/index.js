const { ServiceBroker } = require('moleculer');
const { redis } = require('config');
const actions = require('./actions');

const broker = new ServiceBroker({
  nodeID: 'subscription',
  logLevel: 'info',
  transporter: {
    type: 'Redis',
    options: {
      host: redis.host,
    },
  },
  actions,
});

broker.start();

module.exports = broker;
