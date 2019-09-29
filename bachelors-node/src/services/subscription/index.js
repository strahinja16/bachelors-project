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
      console.log({ payload });
    } catch (e) {
      console.log(e);
      throw new Error(`Error canceling subscription. Message: ${e.message}`);
    }
  }
}

const subscriptionService = new SubscriptionService();

module.exports = {
  subscriptionService,
  SubscriptionService,
};
