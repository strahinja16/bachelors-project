const { subscriptionService } = require('services/subscription');
const logger = require('services/logger');

module.exports = {
	'event.orderCompleted': async (payload) => {
		try {
			await subscriptionService.orderCompleted(payload);
		} catch (ex) {
			logger.error(ex);
		}
	},

	'event.orderFailed': async (payload) => {
		try {
			await subscriptionService.orderFailed(payload);
		} catch (ex) {
			logger.error(ex);
		}
	},

	'event.generateLicence': async (payload) => {
		try {
			await subscriptionService.generateLicence(payload);
		} catch (ex) {
			logger.error(ex);
		}
	},
};
