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
 * Finds user, product and subscription by their fastspring ids
 * @param fastspringId
 * @param name
 * @returns {Promise<{user: Model, product: Model, subscription: Model}>}
 */
const findUserProductAndSubscriptionByFastSpringIds = async (fastspringId, name) => {
  const product = await Product.findOne({
    where: {
      name,
    },
    raw: true,
  });

  const subscription = await Subscription.findOne({
    where: {
      accountId: fastspringId,
    },
    raw: true,
  });

  const user = await User.findOne({
    where: {
      id: subscription.userId,
    },
    raw: true,
  });

  return {
    user,
    product,
    subscription,
  };
};

module.exports = {
  updatePassword,
  findUserProductAndSubscriptionByFastSpringIds,
};
