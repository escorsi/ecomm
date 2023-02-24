/* eslint-disable import/extensions */
import express from 'express';
import ProductController from '../controllers/productsController.js';

const router = express.Router();

router
  .get('/api/products', ProductController.listProducts)
  .get('/api/products/:id', ProductController.findProductById)
  .post('/api/admin/products', ProductController.insertProduct)
  .put('/api/admin/products/:id', ProductController.updateProduct)
  .delete('/api/admin/products/:id', ProductController.deleteProduct);

export default router;
