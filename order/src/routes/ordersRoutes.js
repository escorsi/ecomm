import express from 'express';
import OrderController from '../controllers/OrderController.js';
import bearer from '../utils/auth-middleware.js';

const router = express.Router();

router
  .get('/api/admin/orders/:id', bearer, OrderController.findOrderById)
  .patch('/api/admin/orders/:id', bearer, OrderController.confirmOrder)
  .post('/api/admin/orders', bearer, OrderController.insertOrder);

export default router;
