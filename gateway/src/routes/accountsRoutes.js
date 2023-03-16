import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const accountsRoutes = createProxyMiddleware({
  target: 'http://account:3001/api',
  changeOrigin: true,
});

router
  .get('/admin/accounts', accountsRoutes)
  .get('/accounts/:id', accountsRoutes)
  .get('/admin/accounts/logout', accountsRoutes)
  .post('/admin/accounts', accountsRoutes)
  .post('/accounts/login', accountsRoutes)
  .put('/admin/accounts/:id', accountsRoutes)
  .delete('/admin/accounts/:id', accountsRoutes);

export default router;
