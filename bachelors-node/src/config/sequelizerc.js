const postgres = require('.').db;

module.exports = {
  dialect: 'postgres',
  database: postgres.database,
  host: postgres.host,
  username: postgres.user,
  password: postgres.password,
};
