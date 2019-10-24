const { Router } = require('express');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const { SubscriptionService, subscriptionService } = require('../../services/subscription');
const { User, Subscription } = require('models');
const { encrypt } = require('services/auth');
const broker = require('services/broker');

const router = Router();

router.post('/subscribe', middleware('auth'), async (req, res) => {
  try {
    const { user } = req;
    const { cost } = req.body;

    if (user.licence) {
      return res.status(400).send({ message: 'There is already an active subscription.' });
    }

    const product = SubscriptionService.getSubscriptionProduct(cost);
    const { accountId, storefront } = await broker.call('subscription.subscribe', { user, product });

    await subscriptionService.createSubscription(user.id, accountId);
    await User.update({ fastspringAccountId: accountId }, { where: { id: user.id } } );

    const userNew = await User.findOne({
      where: { id: user.id },
      raw: true,
    });

    delete userNew.password;
    const userToken = encrypt(userNew);

    return res.send({
      storefront,
      auth: {
        user: userNew,
        token: userToken,
      }
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/unsubscribe', middleware('auth'), async (req, res) => {
  try {
    const {
      user: { id },
    } = req;

    const subscription = await Subscription.findOne({
      where: {
        userId: id,
      }
    });

    await broker.call('subscription.unsubscribe', { subscription: subscription.name });

    Subscription.destroy({ where: { userId: id } });

    await User.update(
      {
        licence: null,
        licenceExpirationDate: null,
      },
      {
        where: { id },
      },
    );

    const user = await User.findOne({
      where: { id },
      raw: true,
    });

    delete user.password;
    const userToken = encrypt(user);

    return res.status(200).send({
      user,
      token: userToken,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
