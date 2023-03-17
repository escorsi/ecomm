import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Account from '../models/Account.js';
import addToken from '../../redis/blacklistManipulate.js';

dotenv.config();

const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}/;

function addPassword(senha) {
  const cost = 12;
  return bcrypt.hash(senha, cost);
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
    const account = new Account(req.body);
    if (regexSenha.test(account.senha)) {
      account.senha = await addPassword(account.senha);
      account.save((err) => {
        if (err) {
          res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` });
        } else {
          res.status(201).send(account.toJSON());
        }
      });
    } else {
      res.status(400).send('Falha ao cadastrar usuário - Senha inválida');
    }
  };

  static updateAccount = (req, res) => {
    const { id } = req.params;
    Account.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
      }
    });
  };

  static deleteAccount = (req, res) => {
    const { id } = req.params;
    Account.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'Usuário removido com sucesso!' });
      }
    });
  };

  static login = async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.CHAVE_JWT ?? '', { expiresIn: '15m' });
    res.set('Authorization', token);
    res.status(204).send();
  };

  static logout = async (req, res) => {
    try {
      const { token } = req.params;
      await addToken(token);
      res.status(204).send();
    } catch (err) {
      console.log('A1');
      res.status(500).json({ err: err.message });
    }
  };
}

export default AccountController;
