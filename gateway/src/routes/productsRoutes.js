import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bearer from '../utils/auth-middleware.js';

const router = express.Router();

const productsRoutes = createProxyMiddleware({
  target: 'http://product:3000/api',
  changeOrigin: true,
});

router
  .get('/products', productsRoutes)
  .get('/products/:id', productsRoutes)
  .post('/admin/products', bearer, productsRoutes)
  .put('/admin/products/:id', bearer, productsRoutes)
  .delete('/admin/products/:id', bearer, productsRoutes);

export default router;
