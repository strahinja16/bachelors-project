
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const passwordHashSaltRounds = 10;

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.bulkInsert('users', [{
        id: uuid(),
        name: 'Super admin',
        email: 'admin@test.com',
        password: bcrypt.hashSync('admin', passwordHashSaltRounds),
        status: 'active',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], { transaction });
    } catch (err) {
      console.log(err);
      transaction.rollback();
    }
  }),

  down: queryInterface => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.bulkDelete('users', {
        isAdmin: true,
      }, { transaction });
    } catch (err) {
      console.log(err);
      transaction.rollback();
    }
  }),
};
