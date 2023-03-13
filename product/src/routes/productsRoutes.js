import express from 'express';
import ProductController from '../controllers/productsController.js';
import bearer from '../utils/auth-middleware.js';

const router = express.Router();

router
  .get('/api/products', ProductController.listProducts)
  .get('/api/products/:id', ProductController.findProductById)
  .post('/api/admin/products', bearer, ProductController.insertProduct)
  .put('/api/admin/products/:id', bearer, ProductController.updateProduct)
  .delete('/api/admin/products/:id', bearer, ProductController.deleteProduct);

export default router;
