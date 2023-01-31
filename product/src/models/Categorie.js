import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    status: {type: String, required: true}
  }
);

const categories = mongoose.model('categories', categorieSchema);

export default categories;