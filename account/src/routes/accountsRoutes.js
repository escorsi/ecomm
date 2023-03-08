/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import express from 'express';
// import passport from 'passport';
import AccountController from '../controllers/accountsController.js';

const router = express.Router();

router
  .get('/api/admin/accounts', AccountController.listAccounts)
  .get('/api/accounts/:id', AccountController.findAccountById)
  .post('/api/admin/accounts', AccountController.insertAccount)
  .post('/api/accounts/login', AccountController.login)
  .put('/api/admin/accounts/:id', AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', AccountController.deleteAccount);

export default router;
