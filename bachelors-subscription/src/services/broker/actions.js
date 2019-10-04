const subscriptionService = require('../subscription');
const { fastspring } = require('config');

module.exports = {
	async subscribe({ params }) {
		const { user, product } = params;

		let accId = user.fastspringAccountId;

		if (!accId) {
			accId = await subscriptionService.createAccount(user);
		}

		console.log({ accId });

		const { data: session } = await subscriptionService
			.getApiService()
			.createSession(accId, product);

		return {
			accountId: accId,
			storefront: `${fastspring.storefront}/session/${session.id}`,
		};
	},

	async unsubscribe({ params }) {
		const { subscription } = params;
		await subscriptionService.cancelSubscription(subscription);
	}
};
