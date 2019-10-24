const subscriptionService = require('../subscription');
const { fastspring } = require('config');

module.exports = {
	async subscribe({ params }) {
		try {
			const { user, product } = params;

			let accId = user.fastspringAccountId;

			if (!accId) {
				accId = await subscriptionService.createAccount(user);
			}

			const { data: session } = await subscriptionService
				.getApiService()
				.createSession(accId, product);

			return {
				accountId: accId,
				storefront: `${fastspring.storefront}/session/${session.id}`,
			};
		} catch(e) {
			console.log(e.toString());
		}
	},

	async unsubscribe({ params }) {
		const { subscription } = params;
		await subscriptionService.cancelSubscription(subscription);
	}
};
