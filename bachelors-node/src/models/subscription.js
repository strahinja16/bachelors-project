const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  accountId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

class Subscription extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'subscriptions',
      paranoid: true,
    });
  }

  static associate(models) {
    this.orderAssociation = this.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'orderId',
    });
    this.userAssociation = this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

module.exports = Subscription;
