import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const ordersRoutes = createProxyMiddleware({
  target: 'http://order:3002/api/admin',
  changeOrigin: true,
});

router
  .get('/orders/:id', ordersRoutes)
  .patch('/orders/:id', ordersRoutes)
  .post('/orders', ordersRoutes);

export default router;
