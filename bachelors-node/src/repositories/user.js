const { hashPassword } = require('services/auth');
const {
  User,
  Subscription,
  Product,
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

/**
 * Returns user with subscription and product
 * @param accountId
 * @param name
 * @returns {Promise<void>}
 */
const findUserProductAndSubscriptionByFastSpringIds = async (accountId, name) => {
  const product = await Product.findOne({
    where: {
      name,
    },
    raw: true,
  });

  const user = await User.findOne({
    where: {
      fastspringAccountId: accountId,
    },
    raw: true,
  });

  user.subscription = await Subscription.findOne({
    where: {
      userId: user.id,
    },
    raw: true,
  });

  user.product = product;

  return user;
};

module.exports = {
  updatePassword,
  findUserProductAndSubscriptionByFastSpringIds,
};
