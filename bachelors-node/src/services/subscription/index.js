const md5 = require('blueimp-md5');
const moment = require('moment');
const uuid = require('uuid');
const {
  domains: { api },
  fastspring: { licenceKey },
  mail: { account: mailAccount },
} = require('config');
const pick = require('lodash/pick');
const omit = require('lodash/omit');
const { User, Subscription, Order } = require('models');
const apiService = require('./api');
const {
  findUserProductAndSubscriptionByFastSpringIds: findUserProductAndSubscription,
} = require('repositories/user');
const PurchaseMail = require('../../resources/mails/purchaseMail');
const emailService = require('services/email');
const FailedMail = require('../../resources/mails/failedMail');


const testProductName = 'saasproduct1';
const liveProductName = 'live-product';

class SubscriptionService {
  constructor() {
    this.apiService = apiService;
  }

  getApiService() {
    return this.apiService;
  }

  static getSubscriptionProduct() {
    if (api.includes('localhost')) {
      return testProductName;
    }

    return liveProductName;
  }

  verifyLicenceRequestOrigin(body) {
    const payload = omit(body, ['security_request_hash']);
    const data = Object.values(payload)
      .join('')
      .concat('', licenceKey);

    return body.security_request_hash === md5(data);
  }

  async getUserAccount(userId) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (user.fastspringAccountId) {
        return user.fastspringAccountId;
      }

      const userPayload = pick(user, [
        'id',
        'firstName',
        'lastName',
        'email',
        'companyName',
        'country'
      ]);

      const { data : { id } } = await this.getApiService().createAccount(userPayload);

      await user.update({ fastspringAccountId: id });

      return id;
    } catch (e) {
      throw new Error(`Fastspring account creation error. Message: ${e.message}`);
    }
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

  async cancelSubscription(id) {
    try {
      const { data } = await this.apiService.cancelSubscription(id);
      const payload = data.subscriptions[0];
      if (payload.error) {
        let errorMessage = '';
        Object.values(data.error).forEach(msg => errorMessage.concat(` ${msg}`));
        throw new Error(`Error canceling subscription. Message: ${errorMessage}`);
      }
    } catch (e) {
      console.log(e);
      throw new Error(`Error canceling subscription. Message: ${e.message}`);
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
