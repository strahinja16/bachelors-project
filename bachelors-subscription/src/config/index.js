require('dotenv').config();

const {
  PORT,
  APP_KEY,
  REDIS_HOST,
  FASTSPRING_API_DOMAIN,
  FASTSPRING_USER,
  FASTSPRING_PASS,
  STOREFRONT_URL,
  LICENCE_GENERATOR_KEY,
} = process.env;

const port = PORT || 3001;

module.exports = {
  port,
  appKey: APP_KEY,
  redis: {
    host: REDIS_HOST,
  },
  fastspring: {
    apiDomain: FASTSPRING_API_DOMAIN,
    username: FASTSPRING_USER,
    password: FASTSPRING_PASS,
    storefront: STOREFRONT_URL,
    licenceKey: LICENCE_GENERATOR_KEY,
  },
};
