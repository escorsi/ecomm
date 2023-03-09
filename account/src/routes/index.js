import dotenv from 'dotenv';
import express from 'express';
import accounts from './accountsRoutes.js';

dotenv.config();

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'Ecomm' });
  });

  app.use(
    express.json(),
    accounts,
  );
};

export default routes;
