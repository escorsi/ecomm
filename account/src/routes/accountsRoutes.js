/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import express from 'express';
import AccountController from '../controllers/accountsController.js';
import authMiddleware from '../utils/auth-middleware.cjs';

const router = express.Router();

router
  .get('/api/admin/accounts', authMiddleware.bearer, AccountController.listAccounts)
  .get('/api/accounts/:id', AccountController.findAccountById)
  // .get('/api/admin/accounts/logout', authMiddleware.bearer, AccountController.logout)
  .post('/api/admin/accounts', AccountController.insertAccount)
  .post('/api/accounts/login', authMiddleware.local, AccountController.login)
  .put('/api/admin/accounts/:id', authMiddleware.bearer, AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', authMiddleware.bearer, AccountController.deleteAccount);

export default router;
