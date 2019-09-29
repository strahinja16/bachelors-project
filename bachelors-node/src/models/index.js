
const Sequelize = require('sequelize');
const sequelize = require('../services/db');
const UserModel = require('./user');
const PasswordRecoveryModel = require('./passwordRecovery');
const OrderModel = require('./order');
const ProductModel = require('./product');
const SubscriptionModel = require('./subscription');

const models = {
  User: UserModel.init(sequelize, Sequelize),
  PasswordRecovery: PasswordRecoveryModel.init(sequelize, Sequelize),
  Order: OrderModel.init(sequelize, Sequelize),
  Product: ProductModel.init(sequelize, Sequelize),
  Subscription: SubscriptionModel.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
