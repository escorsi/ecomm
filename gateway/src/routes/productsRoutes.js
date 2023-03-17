import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import bearer from '../utils/auth-middleware.js';

dotenv.config();
const router = express.Router();

const productsRoutes = createProxyMiddleware({
  target: `http://product:${process.env.PRODUCT_PORT}/api`,
  changeOrigin: true,
});

router
  .get('/products', productsRoutes)
  .get('/products/:id', productsRoutes)
  .post('/admin/products', bearer, productsRoutes)
  .put('/admin/products/:id', bearer, productsRoutes)
  .delete('/admin/products/:id', bearer, productsRoutes);

export default router;
