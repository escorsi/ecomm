import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import bearer from '../utils/auth-middleware.js';

dotenv.config();
const router = express.Router();

const paymentsRoutes = createProxyMiddleware({
  target: `http://finance:${process.env.FINANCE_PORT}/api`,
  changeOrigin: true,
});

router
  .get('/payments/:id', bearer, paymentsRoutes)
  .patch('/payments/:id', bearer, paymentsRoutes)
  .post('/payments', bearer, paymentsRoutes);

export default router;
