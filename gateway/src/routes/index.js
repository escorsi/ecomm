import express from 'express';
import categories from './categoriesRoutes.js';
import products from './productsRoutes.js';
import accounts from './accountsRoutes.js';
import orders from './ordersRoutes.js';
import payments from './paymentsRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'Ecomm' });
  });

  app.use(
    express.json(),
    categories,
    products,
    accounts,
    orders,
    payments,
  );
};

export default routes;
