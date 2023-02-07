import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
      _id: false,
      nome: {type: String, required: true},
      categoria_id: {type: String, required: true},
  }
)

const productSchema = new mongoose.Schema(
  {
    id: {type: String},
    nomeProduto: {type: String, required: true},
    slug: {type: String, required: true},
    precoUnitario: {type: Number, required: true},
    quantidadeEstoque: {type: Number, required: true},
    categoria: {type: categorySchema, required: true}
  }
);

const products = mongoose.model('products', productSchema);

export default products;