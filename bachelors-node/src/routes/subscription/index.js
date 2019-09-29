const uuid = require('uuid/v4');
const moment = require('moment');
const { Router } = require('express');
const {
  fastspring: { storefront },
} = require('config');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const { SubscriptionService, subscriptionService } = require('services/subscription');
const { User, Subscription } = require('models');

const router = Router();

const badRequest = res => res.status(400).send({ message: responses(400) });

router.post('/subscribe', middleware('auth'), async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const accId = await subscriptionService.createAccount(id);

    const productName = SubscriptionService.getSubscriptionProduct();
    const { data: session } = await subscriptionService
      .getApiService()
      .createSession(accId, productName);

    return res.send({ storefront: `${storefront}/session/${session.id}` });
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

    if (!(await Subscription.destroy({ where: { userId: id } }))) {
      return res.status(400).send({ message: responses(400) });
    }

    await User.update(
      {
        licence: null,
        licenceExpirationDate: null,
      },
      {
        where: { id },
      },
    );

    return res.send();
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
      licenceExpirationDate: moment().add(1, 'months'),
    });

    return res.send(licence);
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/charge', middleware('auth'), middleware('admin'), async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({ raw: true });
    await subscriptionService.charge(subscriptions);

    return res.send();
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
