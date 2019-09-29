const { Router } = require('express');
const authRouter = require('./auth');
const subscriptionRouter = require('./subscription');
const webhooksRouter = require('./webhooks');

const router = Router();

router.use('/auth', authRouter);
router.use('/subscription', subscriptionRouter);
router.use('/webhooks', webhooksRouter);

module.exports = router;
