const database = require('../models')

class PaymentController {

    static async findPayment(req, res) {
        const { id:thisId } = req.params
        try {
            const {id, valor, nomeCartao, numeroCartao, expiracao, status, createdAt, updatedAt} = await database.Payments.findOne({ 
                where: { 
                id: Number(thisId) 
                }
            })
            return res.status(200).json({id, valor, nomeCartao, numeroCartao, expiracao, status, createdAt, updatedAt})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updatePaymentStatus(req, res) {
        const { id }= req.params;
        const status = req.body
        try {
            await database.Payments.update(status, {where: {id: Number(id)}})
            const statusAtualizado = await database.Payments.findOne({where: {id: Number(id)}})
            return res.status(200).json(statusAtualizado)
        } catch(error) {
            return res.status(500).json(error.message)
        }
      }

    static async insertPayment(req, res) {
        const newPayment = {...req.body, status: 'CRIADO'};
            try {
                const {id, status} = await database.Payments.create(newPayment)
                return res.status(201).set('Location', `/payments/${id}`).json({id, status})
            } catch (error) {
                return res.status(500).json(error.message)
            }
    }
}

module.exports = PaymentController