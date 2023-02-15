import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
      _id: false,
      nome: {type: String, required: true, match: /^[A-z][A-z0-9]{3,}$/},
      categoria_id: {type: String, required: true},
  }
)

const productSchema = new mongoose.Schema(
  {
    id: {type: String},
    nomeProduto: {type: String, required: true, match: /^[A-z][A-z0-9]{3,}$/},
    slug: {type: String, required: true, match: /^[a-zA-Z0-9-]+$/},
    precoUnitario: {type: Number, required: true, min: 0.01},
    quantidadeEstoque: {type: Number, required: true, min: 1, max: 10000},
    categoria: {type: categorySchema, required: true}
  }
);

const products = mongoose.model('products', productSchema);

export default products;