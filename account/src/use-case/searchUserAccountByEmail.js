import { accounts } from './createUserAccount.js';

export function searchUserAccountByEmail(email) {
    const userEmail = accounts.find((account) => account["email"] === email);
    if (!userEmail) return false;

    return userEmail;
}