/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Account from '../models/Account.js';

dotenv.config();

const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}/;

function passwordHash(senha) {
  const cost = 12;
  return bcrypt.hash(senha, cost);
}

function addPassword(senha) {
  if (regexSenha.test(senha)) {
    return (passwordHash(senha));
  }
  return false;
}
class AccountController {
  static listAccounts = (_req, res) => {
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

  static insertAccount = async (req, res) => {
    req.body.senha = await addPassword(req.body.senha);
    if (!req.body.senha) {
      res.status(500).send('Falha ao cadastrar usuário - Senha inválida');
    }
    const account = new Account(req.body);

    try {
      await account.save((err) => {
        if (err) {
          res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` });
        } else {
          res.status(201).send(account.toJSON());
        }
      });
    } catch (err) {
      res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` });
    }
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

  static login = async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.CHAVE_JWT ?? '', { expiresIn: '15m' });
    res.set('Authorization', token);
    res.status(204).send();
  };

/*
  static logout = async (req, res) => {
    try {
      const { token } = req;
      await blacklist.adiciona(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };
*/
}

export default AccountController;
