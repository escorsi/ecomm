import { accounts } from './createUserAccount';

export function searchUserAccountByState(uf) {
  const userState = accounts.filter((account) => account[uf] === uf);
  if (!userState) return false;

  return userState;
}
