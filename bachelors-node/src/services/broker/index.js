const { ServiceBroker } = require('moleculer');
const { redis } = require('config');
const events = require('./events');

const initBroker = () => {
	const broker = new ServiceBroker({
		nodeID: 'api',
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
		name: 'api',
		events,
	});

	return broker;
};

const broker = initBroker();
broker.start();

module.exports = broker;
