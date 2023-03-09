import express from 'express';
import CategorieController from '../controllers/categoriesController.js';
import authMiddleware from '../utils/auth-middleware.cjs';

const router = express.Router();

router
  .get('/api/categories', CategorieController.listCategories)
  .get('/api/categories/:id', CategorieController.findCategorieById)
  .post('/api/admin/categories', authMiddleware.bearer, CategorieController.insertCategorie)
  .put('/api/admin/categories/:id', authMiddleware.bearer, CategorieController.updateCategorie)
  .delete('/api/admin/categories/:id', authMiddleware.bearer, CategorieController.deleteCategorie);

export default router;
