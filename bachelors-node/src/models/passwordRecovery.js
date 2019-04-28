const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  token: {
    type: Sequelize.UUID,
    allowNull: false,
  },
};

class PasswordRecovery extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'password_recovery',
    });
  }

  static associate(models) {
    this.userPasswordRecoveryAssociation = this.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }
}

module.exports = PasswordRecovery;
