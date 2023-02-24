const database = require('../models');

class PaymentController {
  static async findPayment(req, res) {
    const { id: thisId } = req.params;
    try {
      const {
        id, valor, nomeCartao, numeroCartao, expiracao, status,
        createdAt, updatedAt,
      } = await database.Payments.findOne({
        where: {
          id: Number(thisId),
        },
      });
      return res.status(200).json({
        id, valor, nomeCartao, numeroCartao, expiracao, status, createdAt, updatedAt,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updatePaymentStatus(req, res) {
    const { id } = req.params;
    let { status } = req.query;
    const descricao = req.body;

    if (status === 'confirm') {
      status = 'CONFIRMADO';
    } else if (status === 'cancel') {
      status = 'CANCELADO';
    }

    try {
      const onePayment = await database.Payments.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!onePayment) return res.status(404).json('ID informado não existe!');
      if (onePayment.status === 'CRIADO') {
        if (status === 'CONFIRMADO') {
          database.sequelize.transaction(async (transaction) => {
            await database.Payments.update(
              { status },
              { where: { id: Number(id) } },
              { transaction },
            );
            const invoices = await database.Invoices.create(
              { descricao, paymentId: id },
              { transaction },
            );
            return res.status(200).json(invoices);
          });
        } else {
          await database.Payments.update({ status }, { where: { id: Number(id) } });
          return res.status(200).json(`Payment ${status}.`);
        }
      } else {
        return res.status(400).json('Não foi possível realizar a alteração!');
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
    return false;
  }

  static async insertPayment(req, res) {
    const payment = { ...req.body, status: 'CRIADO' };
    try {
      const newPayment = await database.Payments.create(payment);
      const paymentLinks = {
        id: newPayment.id,
        status: newPayment.status,
        links: [
          {
            rel: 'SELF',
            method: 'GET',
            href: `http://localhost:3003/api/admin/payments/${newPayment.dataValues.id}`,
          },
          {
            rel: 'CONFIRM',
            method: 'PATCH',
            href: `http://localhost:3003/api/admin/payments/${newPayment.dataValues.id}?status=confirm`,
          },
          {
            rel: 'CANCEL',
            method: 'PATCH',
            href: `http://localhost:3003/api/admin/payments/${newPayment.dataValues.id}?status=cancel`,
          },
        ],
      };
      return res.status(201).location(`/payments/${paymentLinks.id}`).json(paymentLinks);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PaymentController;
