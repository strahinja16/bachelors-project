const { Router } = require('express');
const authRouter = require('./auth');
const subscriptionRouter = require('./subscription');
const adminRouter = require('./admin');

const router = Router();

router.use('/auth', authRouter);
router.use('/subscription', subscriptionRouter);
router.use('/admin', adminRouter);

module.exports = router;
