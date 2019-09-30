const { ServiceBroker } = require('moleculer');
const actions = require('./actions');

const initBroker = () => {
  const broker = new ServiceBroker({
    nodeID: 'events-1',
    logger: process.env.NODE_ENV === 'development',
    logLevel: 'info',
    transporter: {
      type: 'Redis',
      options: {
        host: 'redis',
      },
    },
  });

  broker.createService({
    name: 'subscription',
    actions,
  });

  return broker;
};

module.exports = initBroker;
