import { accounts } from './createUserAccount.js';
import { searchUserAccountByEmail } from './searchUserAccountByEmail.js';

export function createUserAdress(email, logradouro, numero, complemento, bairro, cep, cidade, uf) {
    if(!searchUserAccountByEmail(email)) {
        return false;
    } else {
        const index = accounts.findIndex((account) => account.email === email);
        accounts[index]["logradouro"] = logradouro;
        accounts[index]["numero"] = numero;
        accounts[index]["complemento"] = complemento;
        accounts[index]["bairro"] = bairro;
        accounts[index]["cep"] = cep;
        accounts[index]["cidade"] = cidade;
        accounts[index]["uf"] = uf;

        return accounts[index];
    }
}
