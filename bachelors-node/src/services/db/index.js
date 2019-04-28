const Sequelize = require('sequelize');
const { db } = require('config');
const logger = require('services/logger');

const {
  host, user, password, database,
} = db;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  logging: process.env.NODE_ENV === 'development' ? logger.info : false,

  define: {
    underscored: false,
  },
});

module.exports = sequelize;
