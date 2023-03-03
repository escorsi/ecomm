import mongoose from 'mongoose';

const categorieSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true, match: /^[A-z][A-z0-9]{3,}$/ },
    status: { type: String, required: true },
  },
);

const Categorie = mongoose.model('Categorie', categorieSchema);

export default Categorie;
