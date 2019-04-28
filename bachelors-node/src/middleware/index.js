const logger = require('services/logger');
const auth = require('./auth');
const admin = require('./admin');
const validate = require('./validate');

const mapping = {
  auth,
  admin,
  validate,
};

module.exports = (middleware) => {
  if (mapping[middleware]) {
    return mapping[middleware];
  }

  logger.warn(`Middleware ${middleware} not registered.`);
  return (req, res, next) => next();
};
