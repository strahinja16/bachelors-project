const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'products',
    });
  }

  static associate(models) {
    this.orderAssociation = this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'productId',
    });
  }
}

module.exports = Product;
