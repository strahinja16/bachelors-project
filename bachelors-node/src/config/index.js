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
};
