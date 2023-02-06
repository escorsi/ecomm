import accounts from "../models/Account.js";

const regexNome = /^[^\d]/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}/;
const regexCpf = /^\d{11}/;
const regexTelefone = /^\d{10, 13}/;
const regexCep = /^\d{8}/;
const regexEstado = /(A[CLMP]|BA|CE|DF|ES|GO|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|TO)/;

class AccountController {
    
  static listAccounts = (req, res) => {
     accounts.find()
        .exec((err, accounts) => {
          res.status(200).json(accounts)
    })
  }

  static listAccountId = (req, res) => {
    const id = req.params.id;

    accounts.findById(id)
      .exec((err, accounts) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do usuário não localizado.`})
      } else {
        res.status(200).send(accounts);
      }
    })
  }

  static insertAccount = (req, res) => {
    let account = new accounts(req.body);

    if(validation(account)) {
      account.save((err) => {
        if(err) {
          res.status(500).send({message: `${err.message} - Falha ao cadastrar usuário.`})
        } else {
          res.status(201).send(account.toJSON())
        }
      })
    } else {
      res.status(500).send({message: `${err.message} - Falha ao cadastrar usuário.`})
    }
    
  }

  static updateAccount = (req, res) => {
    const id = req.params.id;

    if(regexNome.test(req.params.nome) && regexEmail.test(req.params.email) && regexSenha.test(req.params.senha) && 
    regexCpf.test(req.params.cpf) && regexTelefone.test(req.params.telefone) && regexCep.test(req.params.cep) &&
    regexEstado.test(req.params.estado)) {
      accounts.findByIdAndUpdate(id, {$set: req.body}, (err) => {
        if(!err) {
          res.status(200).send({message: 'Usuário atualizado com sucesso!'})
        } else {
          res.status(500).send({message: err.message})
        }
      })
    } else {
      res.status(500).send({message: err.message})
    }
  }

  static deleteAccount = (req, res) => {
    const id = req.params.id;

    accounts.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Usuário removido com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

function validation(account) {
  if(regexNome.test(account.nome) && regexEmail.test(account.email) && regexSenha.test(account.senha) && 
    regexCpf.test(account.cpf) && regexTelefone.test(account.telefone) && regexCep.test(account.cep) &&
    regexEstado.test(account.estado)) {
      return true;
  }

}

export default AccountController

 