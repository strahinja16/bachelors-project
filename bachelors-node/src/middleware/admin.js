const Responses = require('services/responses');

const modelNotAllowed = res => res.status(403).send({ message: Responses(403) });

module.exports = async ({ user: { isAdmin } }, response, next) => {
  try {
    if (!isAdmin) {
      return modelNotAllowed(response);
    }

    return next();
  } catch (e) {
    return response.status(500).send({ message: e.toString() });
  }
};
