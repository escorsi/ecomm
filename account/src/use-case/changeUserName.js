import { searchUserAccountByEmail } from './searchUserAccountByEmail.js';
import { accounts } from './createUserAccount.js';

export function changeUserNameUseCase(email, newName) {
    if(!searchUserAccountByEmail(email)) {
        return false;
    } else {
        const index = accounts.findIndex((account) => account.email === email);
        accounts[index]["name"] = newName;
        return accounts[index];
    }
}