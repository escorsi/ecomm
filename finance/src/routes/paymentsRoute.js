const { Router } = require('express');
const authMiddleware = require('../utils/auth-middleware.cjs');

const PaymentController = require('../controllers/PaymentController.js');

const router = Router();

router
  .get('/api/payments/:id', authMiddleware.bearer, PaymentController.findPayment)
  .patch('/api/payments/:id', authMiddleware.bearer, PaymentController.updatePaymentStatus)
  .post('/api/payments', authMiddleware.bearer, PaymentController.insertPayment);

module.exports = router;
