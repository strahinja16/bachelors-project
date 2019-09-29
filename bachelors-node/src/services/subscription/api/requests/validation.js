const Joi = require('joi');
const { accountSchema, sessionSchema, chargeSchema } = require('./schemas');

const validate = (payload, schema) => {
  const { error } = Joi.validate(payload, schema, { abortEarly: false });
  return !error;
};

const validateCreateAccountPayload = payload => validate(payload, accountSchema);
const validateCreateSessionPayload = payload => validate(payload, sessionSchema);
const validateChargePayload = payload => validate(payload, chargeSchema);

module.exports = {
  validateCreateAccountPayload,
  validateCreateSessionPayload,
  validateChargePayload,
};
