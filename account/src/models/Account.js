import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {   
      _id: false,
      rua: {type: String, required: true},
      nome: {type: String, required: true},
      complemento: {type: String},
      cep: {type: String, required: true},
      cidade: {type: String, required: true},
      estado: {type: String, required: true}
  }
)

const accountSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    cpf: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    telefone: {type: String, required: true},
    dataCriacao: {type: Date, required: true},
    endereco: {type: addressSchema, required: true},
    id_info: {type: mongoose.Schema.Types.ObjectId, ref: 'accountsInfo', required: true}
  }
);

const accounts = mongoose.model('accounts', accountSchema);

export default accounts;