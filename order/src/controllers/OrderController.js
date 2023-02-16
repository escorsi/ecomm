import orders from "../models/Order.js";

class OrderController {
    
  static findOrderById = (req, res) => {
    const id = req.params.id;

    orders.findById(id)
      .exec((err, orders) => {
      if(err) {
        res.status(404).send({message: `${err.message} - Id do pedido não localizado.`})
      } else {
        res.status(200).send(orders);
      }
    })
  }

  static insertOrder = (req, res) => {
    let order = new orders({...req.body, status: "REALIZADO"});
    order.save((err) => {
        if(err) {
          res.status(500).send({message: `${err.message} - Falha ao cadastrar pedido.`})
        } else {
          res.status(201).send(order.toJSON())
        }
      })
  }

  static confirmOrder = (req, res) => {
    const id = req.params.id;
    orders.findByIdAndUpdate(id, {$set: req.body, status: "PAGO"}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Produto atualizado com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default OrderController