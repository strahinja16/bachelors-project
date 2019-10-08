const { Router } = require('express');
const logger = require('services/logger');
const broker = require('services/broker');
const subscriptionService = require('services/subscription');

const router = Router();

router.post('/order-completed', async (req, res) => {
	try {
		const {
			id, account, total, items,
		} = req.body.events[0].data;

		if (!account || !items) {
			return res.status(400).send('Bad request');
		}

		const payload = {
			accountId: account,
			productName: items[0].product,
			orderId: id,
			totalPrice: total,
			subscriptionId: items[0].subscription
		};

		broker.emit("event.orderCompleted", payload);

		return res.send();
	} catch (ex) {
		logger.error(ex);
		return res.status(500).send({
			message: 'Something went wrong',
		});
	}
});

router.post('/order-failed', async (req, res) => {
	try {
		const { account, reason } = req.body.events[0].data;

		if (!account) {
			return res.status(400).send('Bad request');
		}

		const payload = {
			accountId: account,
			failureReason: reason
		};

		broker.emit("event.orderFailed", payload);

		return res.send();
	} catch (ex) {
		logger.error(ex);
		return res.status(500).send({
			message: 'Something went wrong',
		});
	}
});

router.post('/generate-licence', async (req, res) => {
	try {
		const verified = subscriptionService.verifyLicenceRequestOrigin(req.body);

		if (!verified) {
			return res.status(400).send('Bad request');
		}

		broker.emit("event.generateLicence", { email: req.body.email });

		return res.send('Please check your email for the details of purchase');
	} catch (ex) {
		logger.error(ex);
		return res.status(500).send({
			message: 'Something went wrong',
		});
	}
});

module.exports = router;

