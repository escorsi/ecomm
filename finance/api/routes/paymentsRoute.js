const { Router } = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = Router();

router
  .get('/api/payments/:id', PaymentController.findPayment)
  .patch('/api/payments/:id', PaymentController.updatePaymentStatus)
  .post('/api/payments', PaymentController.insertPayment);

module.exports = router;
