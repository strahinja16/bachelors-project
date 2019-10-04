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

module.exports = {
  userRequest,
  sessionRequest,
};
