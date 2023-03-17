import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import bearer from '../utils/auth-middleware.js';

dotenv.config();
const router = express.Router();

const ordersRoutes = createProxyMiddleware({
  target: `http://order:${process.env.ORDER_PORT}/api/admin/`,
  changeOrigin: true,
});

router
  .get('/orders/:id', bearer, ordersRoutes)
  .patch('/orders/:id', bearer, ordersRoutes)
  .post('/orders', bearer, ordersRoutes);

export default router;
