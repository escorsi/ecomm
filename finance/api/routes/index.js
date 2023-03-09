/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const payments = require('./paymentsRoute.js');

dotenv.config();

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(payments);
};
