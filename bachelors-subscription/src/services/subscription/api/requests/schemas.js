const Joi = require('joi');

const accountSchema = {
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  companyName: Joi.string().required(),
  country: Joi.string().required(),
};

const sessionSchema = {
  account: Joi.string().required(),
  product: Joi.string().required(),
};

module.exports = {
  accountSchema,
  sessionSchema,
};
