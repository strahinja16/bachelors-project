const faker = require('faker');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const passwordHashSaltRounds = 10;

module.exports = {
  up: (queryInterface) => {
    const insertData = [];

    for (let i = 0; i < 10; i++) {
      insertData.push({
        id: uuid(),
        name: faker.name.findName(),
        email: `user${i}@test.com`,
        password: bcrypt.hashSync('test', passwordHashSaltRounds),
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('users', insertData, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
