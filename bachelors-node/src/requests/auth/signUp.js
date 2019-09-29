const Joi = require('joi');

module.exports = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  companyName: Joi.string().required(),
  country: Joi.string().required(),
};
