
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => {
    const insertData = [];

    const prices = [5.00, 10.00, 15.00];
    const priceNames = [
      'domainManagerPersonalLicence',
      'domainManagerProfessionalLicence',
      'domainManagerEnterpriseLicence'
    ];

    prices.forEach((price, index) => {
      insertData.push({
        id: uuid(),
        name: priceNames[index],
        price: prices[index],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return queryInterface.bulkInsert('products', insertData, {});
  },

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};
