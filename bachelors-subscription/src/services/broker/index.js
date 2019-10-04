const { ServiceBroker } = require('moleculer');
const { redis } = require('config');
const actions = require('./actions');

const initBroker = () => {
  const broker = new ServiceBroker({
    nodeID: 'subscription',
    logger: process.env.NODE_ENV === 'development',
    logLevel: 'info',
    transporter: {
      type: 'Redis',
      options: {
        host: redis.host,
      },
    },
  });

  broker.createService({
    name: 'subscription',
    actions,
  });

  return broker;
};

const broker = initBroker();
broker.start();

module.exports = broker;
