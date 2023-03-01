/* eslint-disable no-shadow */
import Product from '../models/Product.js';
import Categorie from '../models/Categorie.js';

const regexNome = /^[^\d]/;
const regexSlug = /^[a-zA-Z0-9-]+$/;

function validation(product) {
  return !!(product.nomeProduto.length > 3
    && regexNome.test(product.nomeProduto)
    && product.precoUnitario > 0
    && product.quantidadeEstoque > 0
    && product.quantidadeEstoque < 10000
    && regexSlug.test(product.slug));
}
class ProductController {
  static listProducts = (req, res) => {
    Product.find()
      .populate('categoria')
      .exec((err, products) => {
        if (err) {
          res.status(404).send({ message: `${err.message} - Produto nãos localizados.` });
        } else {
          res.status(200).json(products);
        }
      });
  };

  static findProductById = (req, res) => {
    const { id } = req.params;

    Product.findById(id)
      .populate('categoria', 'id')
      .exec((err, products) => {
        if (err) {
          res.status(404).send({ message: `${err.message} - Id do produto não localizado.` });
        } else {
          res.status(200).send(products);
        }
      });
  };

  static insertProduct = (req, res) => {
    const product = new Product(req.body);

    Categorie.findById(product.categoria.categoria_id, (err) => {
      if (!err) {
        product.save((err) => {
          if (err) {
            res.status(500).send({ message: `${err.message} - Falha ao cadastrar produto.` });
          } else {
            res.status(201).send(product.toJSON());
          }
        });
      } else {
        res.status(404).send({ message: 'Categoria inválida! Não foi possível inserir esse produto.' });
      }
    });
  };

  static updateProduct = (req, res) => {
    const { id } = req.params;

    if (validation(req.body)) {
      Categorie.findById(req.body.categoria.categoria_id, (err) => {
        if (!err) {
          Product.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
              res.status(200).send({ message: 'Produto atualizado com sucesso!' });
            } else {
              res.status(500).send({ message: err.message });
            }
          });
        } else {
          res.status(404).send({ message: 'Não foi possível atualizar esse produto.' });
        }
      });
    } else {
      res.status(500).send({ message: 'Não foi possível atualizar esse produto.' });
    }
  };

  static deleteProduct = (req, res) => {
    const { id } = req.params.id;

    Product.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Produto removido com sucesso!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default ProductController;
