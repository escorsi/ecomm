import orders from "../models/Order.js";

class OrderController {
    
  static findOrder = (req, res) => {
    const id = req.params.id;

    orders.findById(id)
      .exec((err, orders) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do pedido não localizado.`})
      } else {
        res.status(200).send(orders);
      }
    })
  }

  static insertOrder = (req, res) => {
    let order = new orders(req.body);
    order.save((err) => {
        if(err) {
          res.status(500).send({message: `${err.message} - Falha ao cadastrar pedido.`})
        } else {
          res.status(201).send(order.toJSON())
        }
      })
  }

  static updateOrder = (req, res) => {
    const id = req.params.id;


          orders.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
              res.status(200).send({message: 'Produto atualizado com sucesso!'})
            } else {
              res.status(500).send({message: err.message})
            }
          })
  }


}


export default OrderController