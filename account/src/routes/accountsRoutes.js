/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import AccountController from '../controllers/accountsController.js';

const router = express.Router();

router
  .get('/api/admin/accounts', passport.authenticate('bearer', { session: false }), AccountController.listAccounts)
  .get('/api/accounts/:id', AccountController.findAccountById)
  .post('/api/admin/accounts', AccountController.insertAccount)
  .post('/api/accounts/login', passport.authenticate('local', { session: false }), AccountController.login)
  .put('/api/admin/accounts/:id', passport.authenticate('bearer', { session: false }), AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', passport.authenticate('bearer', { session: false }), AccountController.deleteAccount);

export default router;
