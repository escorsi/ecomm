import mongoose from "mongoose";

const adressSchema = new mongoose.Schema(
  {
      _id: false,
      numero: {type: String, required: true},
      rua: {type: String, required: true},
      complemento: {type: String},
      cep: {type: String, required: true},
      cidade: {type: String, required: true},
      estado: {type: String, required: true}
  }
)

const orderSchema = new mongoose.Schema(
  {
    id: {type: String},
    data: {type: Date, required: true},
    adress: {type: adressSchema, required: true},
    id_usuario: {type: String, required: true},
    nome: {type: String, required: true},
    produtos: {type: Array, required: true}
  }
);

const orders = mongoose.model('orders', orderSchema);

export default orders;