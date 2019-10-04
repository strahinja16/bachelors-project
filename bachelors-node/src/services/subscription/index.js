const moment = require('moment');
const uuid = require('uuid');
const {
  domains: { api },
  mail: { account: mailAccount },
} = require('config');
const { User, Subscription, Order } = require('models');
const {
  findUserProductAndSubscriptionByFastSpringIds: findUserProductAndSubscription,
} = require('repositories/user');
const PurchaseMail = require('../../resources/mails/purchaseMail');
const emailService = require('services/email');
const FailedMail = require('../../resources/mails/failedMail');


const testProductName = 'saasproduct1';
const liveProductName = 'live-product';

class SubscriptionService {
  static getSubscriptionProduct() {
    if (api.includes('localhost')) {
      return testProductName;
    }

    return liveProductName;
  }

  async createSubscription(userId, accountId) {
    try {
      await Subscription.create({
        userId,
        accountId,
      });
    } catch (e) {
      throw new Error(`Fastspring account creation error. Message: ${e.message}`);
    }
  }

  async orderCompleted({ accountId, productName, orderId, totalPrice, subscriptionId }) {

    const user = await findUserProductAndSubscription(accountId, productName);

    const createdOrder = await Order.create({
      userId: user.id,
      productId: user.product.id,
      name: orderId,
      price: totalPrice,
    });

    await Subscription.update(
      {
        orderId: createdOrder.id,
        name: subscriptionId,
      },
      { where: { id: user.subscription.id } },
    );

    const subject = 'Successful purchase';
    const mail = new PurchaseMail(mailAccount, 'strahinjadevmail2@gmail.com', subject, user);
    await emailService.sendEmail(mail);
  }

  async orderFailed({ accountId, failureReason }) {
    const user = await User.findOne({ where: { fastspringAccountId: accountId }, raw: true });

    await Subscription.destroy({
      where: {
        userId: user.id,
      },
    });

    const subject = 'Order failed.';
    const mail = new FailedMail(mailAccount, 'strahinjadevmail2@gmail.com', subject, user, failureReason);
    await emailService.sendEmail(mail);
  }

  async generateLicence({ email }) {
    const user = await User.findOne({ where: { email } });

    await user.update({
      licence: uuid(),
      licenceExpirationDate: moment().add(1, 'weeks'),
    });
  }
}

const subscriptionService = new SubscriptionService();

module.exports = {
  subscriptionService,
  SubscriptionService,
};
