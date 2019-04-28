const { hashPassword } = require('services/auth');
const {
  User,
} = require('models');

/**
 * Updates password of user with given id
 * @param id
 * @param newPassword
 * @returns {Promise<*>}
 */
const updatePassword = async (id, newPassword) => User.update(
  {
    password: hashPassword(newPassword),
  },
  {
    where: { id },
  },
);

module.exports = {
  updatePassword,
};
