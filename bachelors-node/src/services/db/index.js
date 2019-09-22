const Sequelize = require('sequelize');
const { db } = require('config');
const logger = require('services/logger');

const {
  host, user, password, database,
} = db;

console.log(logger, 'sequelize');

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

  logging: process.env.NODE_ENV === 'development',

  define: {
    underscored: false,
  },
});

module.exports = sequelize;
