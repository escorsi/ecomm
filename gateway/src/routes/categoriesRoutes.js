import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bearer from '../utils/auth-middleware.js';

const router = express.Router();

const categoriesRoutes = createProxyMiddleware({
  target: 'http://product:3000/api',
  changeOrigin: true,
});

router
  .get('/categories', categoriesRoutes)
  .get('/categories/:id', categoriesRoutes)
  .post('/admin/categories', bearer, categoriesRoutes)
  .put('/admin/categories/:id', bearer, categoriesRoutes)
  .delete('/admin/categories/:id', bearer, categoriesRoutes);

export default router;
