import { searchUserAccountByEmail } from "../src/use-case/searchUserAccountByEmail.js";
import { createUserUseCase } from "../src/use-case/createUserAccount.js";

createUserUseCase("Teste", "teste@email.com", "senhaTeste")
createUserUseCase("Patrick", "teste2@email.com", "senhaTeste")
createUserUseCase("AAAAA", "teste3@email.com", "senhaTeste")

if (!searchUserAccountByEmail("teste@email.com")) {
    console.log("Não foi possível encontrar esta conta!");
} else {
    console.log(searchUserAccountByEmail("teste@email.com"));
}
