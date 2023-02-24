/* eslint-disable import/extensions */
import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

router
  .get('/api/admin/orders/:id', OrderController.findOrderById)
  .patch('/api/admin/orders/:id', OrderController.confirmOrder)
  .post('/api/admin/orders', OrderController.insertOrder);

export default router;
