const Sequelize = require('sequelize');
const moment = require('moment');

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
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
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
  signUpToken: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  licence: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  licenceExpirationDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  fastspringAccountId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isLicensed: {
    type: Sequelize.VIRTUAL(Sequelize.BOOLEAN),
    get() {
      if (!this.get('licenceExpirationDate')) {
        return false;
      }
      return moment().isBefore(moment(this.get('licenceExpirationDate')));
    },
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
    this.userOrderAssociation = this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'userId',
    });
  }
}

module.exports = User;
module.exports.STATUSES = STATUSES;
module.exports.STATUSES_ARRAY = Object.values(STATUSES);
