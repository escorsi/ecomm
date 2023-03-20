import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import bearer from '../utils/auth-middleware.js';

dotenv.config();
const router = express.Router();

const categoriesRoutes = createProxyMiddleware({
  target: `http://product:${process.env.PRODUCT_PORT}/api`,
  changeOrigin: true,
});

router
  .get('/categories', categoriesRoutes)
  .get('/categories/:id', categoriesRoutes)
  .post('/admin/categories', bearer, categoriesRoutes)
  .put('/admin/categories/:id', bearer, categoriesRoutes)
  .delete('/admin/categories/:id', bearer, categoriesRoutes);

export default router;
