
const uuid = require('uuid/v4');
const faker = require('faker');
const bcrypt = require('bcrypt');

const passwordHashSaltRounds = 10;

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.bulkInsert('users', [{
        id: uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'admin2@test.com',
        password: bcrypt.hashSync('admin', passwordHashSaltRounds),
        status: 'active',
        isAdmin: true,
        companyName: faker.company.companyName(),
        country: faker.address.countryCode(),
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
