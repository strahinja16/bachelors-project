module.exports = {
	'event.orderCompleted': async (payload) => {
		try {
			// subscription service order completed handler
		} catch (ex) {
			logger.error(ex);
		}
	},

	'event.orderFailed': async (payload) => {
		try {
			// subscription service order failed handler
		} catch (ex) {
			logger.error(ex);
		}
	},

	'event.generateLicence': async () => {
		try {
			// subscription service generate licence handler
		} catch (ex) {
			logger.error(ex);
		}
	},
};
