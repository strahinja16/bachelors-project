const Sequelize = require('sequelize');

const STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: Object.values(STATUSES),
    allowNull: false,
    defaultValue: STATUSES.INACTIVE,
  },
  registerToken: {
    type: Sequelize.UUID,
    allowNull: true,
  },
};

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'users',
    });
  }

  static associate(models) {
    this.userPasswordRecoveryAssociation = this.hasMany(models.PasswordRecovery, {
      as: 'passwordRecoveries',
      foreignKey: 'userId',
    });
  }
}

module.exports = User;
module.exports.STATUSES = STATUSES;
module.exports.STATUSES_ARRAY = Object.values(STATUSES);
