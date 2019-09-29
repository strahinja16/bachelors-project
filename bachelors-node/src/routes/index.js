const { Router } = require('express');
const authRouter = require('./auth');
const subscriptionRouter = require('./subscription');
const webhooksRouter = require('./webhooks');
const adminRouter = require('./admin');

const router = Router();

router.use('/auth', authRouter);
router.use('/subscription', subscriptionRouter);
router.use('/webhooks', webhooksRouter);
router.use('/admin', adminRouter);

module.exports = router;
