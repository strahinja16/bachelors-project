require('dotenv').config();

const {
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDB,
  APP_KEY,
  APP_DOMAIN,
  FRONTEND_DOMAIN,
  EMAIL_ACC,
  EMAIL_PASS,
  FASTSPRING_API_DOMAIN,
  FASTSPRING_USER,
  FASTSPRING_PASS,
  STOREFRONT_URL,
  LICENCE_GENERATOR_KEY,
} = process.env;

const port = PORT || 3000;

module.exports = {
  port,
  db: {
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDB,
  },
  appKey: APP_KEY,
  domains: {
    frontend: FRONTEND_DOMAIN,
    api: APP_DOMAIN,
  },
  mail: {
    account: EMAIL_ACC,
    password: EMAIL_PASS,
  },
  fastspring: {
    apiDomain: FASTSPRING_API_DOMAIN,
    username: FASTSPRING_USER,
    password: FASTSPRING_PASS,
    storefront: STOREFRONT_URL,
    licenceKey: LICENCE_GENERATOR_KEY,
  },
};
