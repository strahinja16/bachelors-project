const { PasswordRecovery, User } = require('models');

/**
 * Gets password recovery entity with it's user
 * @param token
 * @returns {Promise<Model>}
 */
const getPasswordRecoveryWithUser = async token => PasswordRecovery.findOne({
  where: {
    token,
  },
  include: [
    {
      model: User,
    },
  ],
  raw: true,
  nest: true,
});

module.exports = {
  getPasswordRecoveryWithUser,
};
