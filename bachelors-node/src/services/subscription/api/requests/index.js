const userRequest = ({
  id, firstName, lastName, email, companyName, country,
}) => ({
  contact: {
    first: firstName,
    last: lastName,
    email,
    company: companyName,
  },
  language: 'en',
  country,
  lookup: {
    custom: id,
  },
});

const sessionRequest = ({ account, product }) => ({
  account,
  items: [
    {
      product,
      quantity: 1,
    },
  ],
});

const chargeRequest = ({ ids }) => ({
  subscriptions: ids.map(subscription => ({
    subscription,
  })),
});

module.exports = {
  userRequest,
  sessionRequest,
  chargeRequest,
};
