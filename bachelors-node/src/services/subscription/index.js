const md5 = require('blueimp-md5');
const {
  domains: { api },
  fastspring: { licenceKey },
} = require('config');
const pick = require('lodash/pick');
const omit = require('lodash/omit');
const { User, Subscription } = require('models');
const apiService = require('./api');

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

  async createAccount(userId) {
    try {
      const user = await User.findOne({ where: { id: userId } });

      const subscription = await Subscription.findOne({
        where: { userId: user.id },
        paranoid: false,
      });

      if (subscription && subscription.accountId) {
        if (!subscription.deletedAt) {
          throw new Error(`Fastspring account exists and is already active. User ${userId}`);
        } else {
          throw new Error(`Fastspring account exists and is disabled. User ${userId}`);
        }
      }

      const userPayload = pick(user, ['id', 'firstName', 'lastName', 'email', 'companyName', 'country']);
      const {
        data: { id },
      } = await this.getApiService().createAccount(userPayload);

      await Subscription.create({
        userId: user.id,
        accountId: id,
      });

      return id;
    } catch (e) {
      throw new Error(`Fastspring account creation error. Message: ${e.message}`);
    }
  }
}

const subscriptionService = new SubscriptionService();

module.exports = {
  subscriptionService,
  SubscriptionService,
};
