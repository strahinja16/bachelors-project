const uuid = require('uuid/v4');
const moment = require('moment');
const { Router } = require('express');
const {
  fastspring: { storefront },
} = require('config');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const { SubscriptionService, subscriptionService } = require('../../services/subscription');
const { User, Subscription } = require('models');
const { encrypt } = require('services/auth');

const router = Router();

const badRequest = res => res.status(400).send({ message: responses(400) });

router.post('/subscribe', middleware('auth'), async (req, res) => {
  try {
    const {
      user: { id },
    } = req;

    const subscription = await Subscription.findOne({
      where: { userId: id },
    });

    if (subscription) {
      return res.status(400).send({ message: 'There is already an active subscription.' });
    }

    const accId = await subscriptionService.getUserAccount(id);

    await subscriptionService.createSubscription(id, accId);

    const productName = SubscriptionService.getSubscriptionProduct();

    const { data: session } = await subscriptionService
      .getApiService()
      .createSession(accId, productName);

    const user = await User.findOne({
      where: { id },
      raw: true,
    });

    delete user.password;
    const userToken = encrypt(user);

    return res.send({
      storefront: `https://${storefront}/session/${session.id}`,
      auth: {
        user,
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

    await subscriptionService.cancelSubscription(subscription.name);

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

router.post('/generate-licence', async (req, res) => {
  try {
    const verified = subscriptionService.verifyLicenceRequestOrigin(req.body);

    if (!verified) {
      return badRequest(res);
    }

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    const licence = uuid();
    await user.update({
      licence: uuid(),
      licenceExpirationDate: moment().add(1, 'weeks'),
    });

    return res.send(licence);
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
