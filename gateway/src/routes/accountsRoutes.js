import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import bearer from '../utils/auth-middleware.js';

dotenv.config();
const router = express.Router();

const accountsRoutes = createProxyMiddleware({
  target: `http://account:${process.env.ACCOUNT_PORT}/api`,
  changeOrigin: true,
});

router
  .get('/admin/accounts', bearer, accountsRoutes)
  .get('/accounts/:id', accountsRoutes)
  .get('/admin/accounts/logout/:token', bearer, accountsRoutes)
  .post('/admin/accounts', accountsRoutes)
  .post('/accounts/login', accountsRoutes)
  .put('/admin/accounts/:id', bearer, accountsRoutes)
  .delete('/admin/accounts/:id', bearer, accountsRoutes);

export default router;
