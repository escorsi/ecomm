import express from 'express';
import AccountController from '../controllers/accountsController.js';
import { local, bearer } from '../utils/auth-middleware.js';

const router = express.Router();

router
  .get('/api/admin/accounts', bearer, AccountController.listAccounts)
  .get('/api/accounts/:id', AccountController.findAccountById)
  .get('/api/admin/accounts/logout', bearer, AccountController.logout)
  .post('/api/admin/accounts', AccountController.insertAccount)
  .post('/api/accounts/login', local, AccountController.login)
  .put('/api/admin/accounts/:id', bearer, AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', bearer, AccountController.deleteAccount);

export default router;
