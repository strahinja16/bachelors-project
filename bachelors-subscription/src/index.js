const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('services/logger');
const broker = require('services/broker');

const app = express();

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.url}`);
    next();
  });
}


app.get('/', (req, res) => {
  broker.emit('test', { prop: 'prop'});
  res.send({ hi: 'hi'});
});

app.use('/webhooks', require('./webhooks'));

/**
 * Exports express
 * @public
 */
module.exports = app;
