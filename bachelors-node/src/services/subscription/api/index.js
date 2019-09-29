const axios = require('axios');
const {
  fastspring: { apiDomain, username, password },
} = require('config');
const { userRequest, sessionRequest, chargeRequest } = require('./requests');
const {
  validateCreateAccountPayload,
  validateCreateSessionPayload,
  validateChargePayload,
} = require('./requests/validation');

class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: `${apiDomain}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      auth: {
        username,
        password,
      },
    });
  }

  async createAccount(user) {
    if (!validateCreateAccountPayload(user)) {
      throw new Error('invalid payload');
    }
    const payload = userRequest(user);
    return this.makeApiCall('/accounts', payload);
  }

  async createSession(account, product) {
    if (!validateCreateSessionPayload({ account, product })) {
      throw new Error('invalid payload');
    }
    const payload = sessionRequest({ account, product });
    return this.makeApiCall('/sessions', payload);
  }

  async cancelSubscription(id) {
    return this.makeApiCall(`/subscriptions/${id}`, {} ,'delete');
  }

  async makeApiCall(url, payload, method = 'post') {
    return this.axios[method](url, payload);
  }
}

const apiService = new ApiService();

module.exports = apiService;
