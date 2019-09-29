const { Router } = require('express');
const logger = require('services/logger');
const emailService = require('services/email');
const responses = require('services/responses');
const { Order, Subscription, User } = require('models');
const {
  findUserProductAndSubscriptionByFastSpringIds: findUserProductAndSubscription,
} = require('repositories/user');
const {
  mail: { account: mailAccount },
} = require('../../config');
const router = Router();
const PurchaseMail = require('../../resources/mails/purchaseMail');
const FailedMail = require('../../resources/mails/failedMail');

const errorResponse = res => res.status(500).send({ message: responses(500) });

router.post('/order-completed', async (req, res) => {
  try {
    const {
      id, account, completed, total, items,
    } = req.body.events[0].data;

    if (!account || !items) {
      return errorResponse(res);
    }

    const user = await findUserProductAndSubscription(account, items[0].product);

    if (!user || !completed) {
      return errorResponse(res);
    }

    const createdOrder = await Order.create({
      userId: user.id,
      productId: user.product.id,
      name: id,
      price: total,
    });

    await Subscription.update(
      {
        orderId: createdOrder.id,
        name: items[0].subscription,
      },
      { where: { id: user.subscription.id } },
    );

    const subject = 'Successful purchase';
    const mail = new PurchaseMail(mailAccount, 'strahinjadevmail2@gmail.com', subject, user);
    await emailService.sendEmail(mail);
    return res.send();
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/order-failed', async (req, res) => {
  try {
    const { account, completed, reason } = req.body.events[0].data;

    if (!account || completed) {
      return errorResponse(res);
    }

    const user = await User.findOne({ where: { fastspringAccountId: account }, raw: true });

    await Subscription.destroy({
      where: {
        userId: user.id,
      },
    });

    const subject = 'Order failed.';
    const mail = new FailedMail(mailAccount, 'strahinjadevmail2@gmail.com', subject, user, reason);
    await emailService.sendEmail(mail);

    return res.send();
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
