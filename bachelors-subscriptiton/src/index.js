const initBroker = require('services/broker');

module.exports = () => {
  const broker = initBroker();
  broker.start();

  console.log('broker start');
};
