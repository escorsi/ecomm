import express from "express";
import CategorieController from "../controllers/categoriesController.js";

const router = express.Router();

router
  .get("/api/categories", CategorieController.listCategories)
  .get("/api/categories/:id", CategorieController.findCategorieById)
  .post("/api/admin/categories", CategorieController.insertCategorie)
  .put("/api/admin/categories/:id", CategorieController.updateCategorie)
  .delete("/api/admin/categories/:id", CategorieController.deleteCategorie)

export default router;   