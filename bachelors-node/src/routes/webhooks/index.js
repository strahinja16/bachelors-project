const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const { Order, Subscription } = require('models');
const {
  findUserProductAndSubscriptionByFastSpringIds: findUserProductAndSubscription,
} = require('repositories/user');

const router = Router();

const errorResponse = res => res.status(500).send({ message: responses(500) });

router.post('/order-completed', async (req, res) => {
  try {
    const {
      id, account, completed, total, items,
    } = req.body.events[0].data;

    if (!account || !items) {
      return errorResponse(res);
    }

    const { user, product, subscription } = await findUserProductAndSubscription(
      account.account,
      items[0].product,
    );

    if (!user || !product || !subscription || !completed) {
      return errorResponse(res);
    }

    const createdOrder = await Order.create({
      userId: user.id,
      productId: product.id,
      name: id,
      price: total,
      completed,
    });

    await Subscription.update(
      {
        orderId: createdOrder.id,
        name: items[0].subscription.id,
      },
      { where: { id: subscription.id } },
    );

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
    const {
      id, account, completed, total, items, reason,
    } = req.body.events[0].data;

    if (!account || !items) {
      return errorResponse(res);
    }

    const { user, product, subscription } = await findUserProductAndSubscription(
      account.id,
      items[0].product,
    );

    if (!user || !product || !subscription || completed) {
      return errorResponse(res);
    }

    await Order.create({
      userId: user.id,
      productId: product.id,
      name: id,
      price: total,
      failureReason: reason,
      completed,
    });

    return res.send();
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/fulfillment-failed', async (req, res) => {
  try {
    const {
      order, product: productId, account, reason,
    } = req.body.events[0].data;

    if (!account || !productId) {
      return errorResponse(res);
    }

    const { user, product } = await findUserProductAndSubscription(account, productId);

    await Order.create({
      userId: user.id,
      productId: product.id,
      name: order,
      price: product.price,
      failureReason: reason,
      completed: false,
    });

    return res.send();
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
