
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => {
    const insertData = [];

    insertData.push({
      id: uuid(),
      name: 'saasproduct1',
      price: 1.00,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('products', insertData, {});
  },

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};
