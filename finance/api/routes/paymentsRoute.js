const { Router } = require('express')
const PaymentController = require('../controllers/PaymentController')

const router = Router()

router
  .get('/payments/:id', PaymentController.findPayment)
  .patch('/payments/:id', PaymentController.updatePaymentStatus)
  .post('/payments', PaymentController.insertPayment)


module.exports = router
