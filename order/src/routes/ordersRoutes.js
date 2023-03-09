import express from 'express';
import OrderController from '../controllers/OrderController.js';
import authMiddleware from '../utils/auth-middleware.cjs';

const router = express.Router();

router
  .get('/api/admin/orders/:id', authMiddleware.bearer, OrderController.findOrderById)
  .patch('/api/admin/orders/:id', authMiddleware.bearer, OrderController.confirmOrder)
  .post('/api/admin/orders', authMiddleware.bearer, OrderController.insertOrder);

export default router;
