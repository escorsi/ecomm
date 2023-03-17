import express from 'express';
import AccountController from '../controllers/accountsController.js';
import local from '../utils/auth-middleware.js';

const router = express.Router();

router
  .get('/api/admin/accounts', AccountController.listAccounts)
  .get('/api/accounts/:id', AccountController.findAccountById)
  .get('/api/admin/accounts/logout', AccountController.logout)
  .post('/api/admin/accounts', AccountController.insertAccount)
  .post('/api/accounts/login', local, AccountController.login)
  .put('/api/admin/accounts/:id', AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', AccountController.deleteAccount);

export default router;
