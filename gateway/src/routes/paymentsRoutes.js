import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const paymentsRoutes = createProxyMiddleware({
  target: 'http://finance:3003/api',
  changeOrigin: true,
});

router
  .get('/payments/:id', paymentsRoutes)
  .patch('/payments/:id', paymentsRoutes)
  .post('/payments', paymentsRoutes);

export default router;
