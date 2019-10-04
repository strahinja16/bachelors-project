const subscriptionService = require('../subscription');
const { fastspring } = require('config');

module.exports = {
	async subscribe({ params }) {
		const { user, product } = params;

		// const { data : { id } } = await subscriptionService.createAccount(user);
		//
		// const { data: session } = await subscriptionService
		// 	.getApiService()
		// 	.createSession(id, product);

		console.log('radi');

		console.log({ user, product });

		return {
			prop: 'rpop',
		};

		// return {
		// 	accountId: id,
		// 	storefront: `https://${fastspring.storefront}/session/${session.id}`,
		// };
	}
};
