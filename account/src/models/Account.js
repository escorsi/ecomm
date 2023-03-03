import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    _id: false,
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    complemento: { type: String },
    cep: { type: String, required: true, match: /^\d{8}/ },
    cidade: { type: String, required: true },
    estado: { type: String, required: true, match: /(A[CLMP]|BA|CE|DF|ES|GO|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|TO)/ },
  },
);

const accountSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true, match: /^[^\d]/ },
    cpf: { type: String, required: true, match: /^\d{11}/ },
    email: { type: String, required: true, match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ },
    senha: { type: String, required: true, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}/ },
    telefone: { type: String, required: true, match: /^\d{10,13}/ },
    dataCriacao: { type: Date, required: true },
    endereco: { type: addressSchema, required: true },
    id_info: { type: mongoose.Schema.Types.ObjectId, ref: 'accountsInfo', required: true },
  },
);

const Account = mongoose.model('Account', accountSchema);

export default Account;
