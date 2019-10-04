const Joi = require('joi');
const { accountSchema, sessionSchema } = require('./schemas');

const validate = (payload, schema) => {
  const { error } = Joi.validate(payload, schema, { abortEarly: false });
  return !error;
};

const validateCreateAccountPayload = payload => validate(payload, accountSchema);
const validateCreateSessionPayload = payload => validate(payload, sessionSchema);

module.exports = {
  validateCreateAccountPayload,
  validateCreateSessionPayload,
};
