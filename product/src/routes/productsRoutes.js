import express from 'express';
import ProductController from '../controllers/productsController.js';
import authMiddleware from '../utils/auth-middleware.cjs';

const router = express.Router();

router
  .get('/api/products', ProductController.listProducts)
  .get('/api/products/:id', ProductController.findProductById)
  .post('/api/admin/products', authMiddleware.bearer, ProductController.insertProduct)
  .put('/api/admin/products/:id', authMiddleware.bearer, ProductController.updateProduct)
  .delete('/api/admin/products/:id', authMiddleware.bearer, ProductController.deleteProduct);

export default router;
