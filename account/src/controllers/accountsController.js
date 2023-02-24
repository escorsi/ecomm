/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import Account from '../models/Account.js';

class AccountController {
  static listAccounts = (req, res) => {
    Account.find()
      .exec((err, accounts) => {
        if (err) {
          res.status(404).send({ message: `${err.message} - Usuários não localizados.` });
        } else {
          res.status(200).json(accounts);
        }
      });
  };

  static findAccountById = (req, res) => {
    const { id } = req.params;

    Account.findById(id)
      .exec((err, accounts) => {
        if (err) {
          res.status(404).send({ message: `${err.message} - Id do usuário não localizado.` });
        } else {
          res.status(200).send(accounts);
        }
      });
  };

  static insertAccount = (req, res) => {
    const account = new Account(req.body);
    account.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` });
      } else {
        res.status(201).send(account.toJSON());
      }
    });
  };

  static updateAccount = (req, res) => {
    const { id } = req.params;
    Account.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteAccount = (req, res) => {
    const { id } = req.params;
    Account.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default AccountController;
