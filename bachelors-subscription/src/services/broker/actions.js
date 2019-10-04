const subscriptionService = require('../subscription');
const { fastspring } = require('config');

module.exports = {
	async subscribe({ user, product }) {
		const { data : { id } } = await subscriptionService.createAccount(user);

		const { data: session } = await subscriptionService
			.getApiService()
			.createSession(id, product);

		return {
			accountId: id,
			storefront: `https://${fastspring.storefront}/session/${session.id}`,
		};
	}
};
