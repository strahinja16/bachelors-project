const md5 = require('blueimp-md5');
const {
  fastspring: { personalLicenceKey, professionalLicenceKey, enterpriseLicenceKey },
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
    const licenceKey =  this.getLicenceKey(payload.price);

    const data = Object.values(payload)
      .join('')
      .concat('', licenceKey);

    return body.security_request_hash === md5(data);
  }

  getLicenceKey(cost) {
    switch(cost) {
      case '5.00':
        return personalLicenceKey;
      case '15.00':
        return professionalLicenceKey;
      case '50.00':
        return enterpriseLicenceKey;
      default:
        return personalLicenceKey;
    }
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

      const payload = await this.getApiService().createAccount(userPayload);

      console.log({ payload });
      return payload.data.id;
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
