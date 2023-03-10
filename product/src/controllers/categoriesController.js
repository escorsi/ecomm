import Categorie from '../models/Categorie.js';

class CategorieController {
  static listCategories = (req, res) => {
    Categorie.find((err, categories) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - Categorias não localizadas.` });
      } else {
        res.status(200).json(categories);
      }
      return categories;
    });
  };

  static findCategorieById = (req, res) => {
    const { id } = req.params;

    Categorie.findById(id)
      .exec((err, categories) => {
        if (err) {
          res.status(500).send({ message: `${err.message} - Erro ao buscar categoria` });
        } else {
          res.status(200).send(categories);
        }
      });
  };

  static insertCategorie = (req, res) => {
    const categorie = new Categorie(req.body);

    categorie.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar categoria.` });
      } else {
        res.status(201).send(categorie.toJSON());
      }
    });
  };

  static updateCategorie = (req, res) => {
    const { id } = req.params;

    Categorie.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'Categoria atualizada com sucesso!' });
      }
    });
  };

  static deleteCategorie = (req, res) => {
    const { id } = req.params;

    Categorie.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'Categoria removida com sucesso!' });
      }
    });
  };
}

export default CategorieController;
