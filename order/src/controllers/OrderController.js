/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import Order from '../models/Order.js';

class OrderController {
  static findOrderById = (req, res) => {
    const { id } = req.params;

    Order.findById(id)
      .exec((err, orders) => {
        if (err) {
          res.status(404).send({ message: `${err.message} - Id do pedido não localizado.` });
        } else {
          res.status(200).send(orders);
        }
      });
  };

  static insertOrder = (req, res) => {
    const order = new Order({ ...req.body, status: 'REALIZADO' });
    order.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar pedido.` });
      } else {
        res.status(201).send(order.toJSON());
      }
    });
  };

  static confirmOrder = (req, res) => {
    const { id } = req.params;
    Order.findByIdAndUpdate(id, { $set: req.body, status: 'PAGO' }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Produto atualizado com sucesso!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default OrderController;
