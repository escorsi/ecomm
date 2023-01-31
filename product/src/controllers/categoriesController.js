import categories from "../models/Categorie.js";

class CategorieController {
    
  static listCategories = (req, res) => {
    categories.find((err, categories) => {
        res.status(200).json(categories)
    })
  }

  static listCategorieId = (req, res) => {
    const id = req.params.id;

    categories.findById(id)
      .exec((err, categories) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id da categoria não localizado.`})
      } else {
        res.status(200).send(categories);
      }
    })
  }

  static insertCategorie = (req, res) => {
    let categorie = new categories(req.body);

    categorie.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao cadastrar categoria.`})
      } else {
        res.status(201).send(categorie.toJSON())
      }
    })
  }

  static updateCategorie = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria atualizada com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteCategorie = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Categoria removida com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default CategorieController