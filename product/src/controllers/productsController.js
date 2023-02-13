import products from "../models/Product.js";
import categories from '../models/Categorie.js';

const regexNome = /^[^\d]/;
const regexSlug = /^[a-zA-Z0-9-]+$/;
class ProductController {
    
  static listProducts = (req, res) => {
      products.find()
        .populate('categoria')
        .exec((err, products) => {
          if(err) {
            res.status(404).send({message: `${err.message} - Produto nãos localizados.`})
          } else {
            res.status(200).json(products)
          }
    })
  }

  static findProductById = (req, res) => {
    const id = req.params.id;

    products.findById(id)
      .populate('categoria', 'id')
      .exec((err, products) => {
      if(err) {
        res.status(404).send({message: `${err.message} - Id do produto não localizado.`})
      } else {
        res.status(200).send(products);
      }
    })
  }

  static insertProduct = (req, res) => {
    let product = new products(req.body);

    if(validation(product)) {
      categories.findById(product.categoria.categoria_id, (err) => {
        if(!err) {
          product.save((err) => {
            if(err) {
              res.status(500).send({message: `${err.message} - Falha ao cadastrar produto.`})
            } else {
              res.status(201).send(product.toJSON())
            }
          })
        } else {
          res.status(404).send({message: `Categoria inválida! Não foi possível inserir esse produto.`})
        }
      })
    } else {
      res.status(500).send({message: `Não foi possível inserir esse produto.`})
    }
  }

  static updateProduct = (req, res) => {
    const id = req.params.id;

    if(req.body.nomeProduto.length > 3 && regexNome.test(req.body.nomeProduto) &&
    req.body.precoUnitario > 0 &&  req.body.quantidadeEstoque > 0 &&  req.body.quantidadeEstoque < 10000 && 
    regexSlug.test(req.body.slug)) {
      categories.findById(req.body.categoria.categoria_id, (err) => {
        if(!err) {
          products.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
              res.status(200).send({message: 'Produto atualizado com sucesso!'})
            } else {
              res.status(500).send({message: err.message})
            }
          })
        } else {
          res.status(404).send({message: `Não foi possível atualizar esse produto.`})
        }
      })
    } else {
      res.status(500).send({message: `Não foi possível atualizar esse produto.`})
    }
  }

  static deleteProduct = (req, res) => {
    const id = req.params.id;

    products.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Produto removido com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

function validation(product) {
  if(product.nomeProduto.length > 3 && regexNome.test(product.nomeProduto) &&
    product.precoUnitario > 0 &&  product.quantidadeEstoque > 0 &&  product.quantidadeEstoque < 10000 && 
    regexSlug.test(product.slug)) {
      return true;
  }

}


export default ProductController