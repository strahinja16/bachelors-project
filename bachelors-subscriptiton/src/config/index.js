require('dotenv').config();

const {
  PORT,
} = process.env;

const port = PORT || 3001;

module.exports = {
  port,
};
