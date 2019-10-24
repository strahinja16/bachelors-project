const { Router } = require('express');
const middleware = require('middleware');
const { User, Order } = require('../../models');

const router = Router();

router.get('/', middleware('auth'), middleware('admin'), async (req, res) => {
	const users = await User.findAll({ raw: true });
	const orders = await Order.findAll({ raw: true });

	users.forEach(user => {
		user.order = orders
			.filter(ord => ord.userId === user.id)
			.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))[0];
	});

	return res.send({ users });
});

module.exports = router;
