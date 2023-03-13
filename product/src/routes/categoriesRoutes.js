import express from 'express';
import CategorieController from '../controllers/categoriesController.js';
import bearer from '../utils/auth-middleware.js';

const router = express.Router();

router
  .get('/api/categories', CategorieController.listCategories)
  .get('/api/categories/:id', CategorieController.findCategorieById)
  .post('/api/admin/categories', bearer, CategorieController.insertCategorie)
  .put('/api/admin/categories/:id', bearer, CategorieController.updateCategorie)
  .delete('/api/admin/categories/:id', bearer, CategorieController.deleteCategorie);

export default router;
