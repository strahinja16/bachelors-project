const md5 = require('blueimp-md5');
const {
  fastspring: { licenceKey },
} = require('config');
const pick = require('lodash/pick');
const omit = require('lodash/omit');
const apiService = require('./api');

class SubscriptionService {
  constructor() {
    this.apiService = apiService;
  }

  getApiService() {
    return this.apiService;
  }

  verifyLicenceRequestOrigin(body) {
    const payload = omit(body, ['security_request_hash']);
    const data = Object.values(payload)
      .join('')
      .concat('', licenceKey);

    return body.security_request_hash === md5(data);
  }

  async createAccount(user) {
    try {
      const userPayload = pick(user, [
        'id',
        'firstName',
        'lastName',
        'email',
        'companyName',
        'country'
      ]);

      const { data : { id } } = await this.getApiService().createAccount(userPayload);

      return id;
    } catch (e) {
      throw new Error(`Fastspring account creation error. Message: ${e.toString()}`);
    }
  }

  async cancelSubscription(subscription) {
    return this.apiService.cancelSubscription(subscription);
  }
}

const subscriptionService = new SubscriptionService();

module.exports = subscriptionService;
