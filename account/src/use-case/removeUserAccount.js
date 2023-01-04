import { accounts } from './createUserAccount.js';
import { searchUserAccountByEmail } from './searchUserAccountByEmail.js';

export function removeUserUseCase(email) {
    if(!searchUserAccountByEmail(email)) {
        return false;
    } else {
        const index = accounts.findIndex((account) => account.email === email);
        accounts.splice(index, 1)
        return true;
    }
}