import { removeUserUseCase } from "../src/use-case/removeUserAccount.js";
import { accounts, createUserUseCase } from "../src/use-case/createUserAccount.js";

createUserUseCase("Teste", "teste@email.com", "senhaTeste")
createUserUseCase("Patrick", "teste2@email.com", "senhaTeste")
createUserUseCase("AAAAA", "teste3@email.com", "senhaTeste")

if (!removeUserUseCase("teste2@email.com")) {
    console.log("Não foi possível remover esta conta!");
} else {
    console.log("Conta removida com sucesso! \n");
    console.log("Contas existentes: \n");
    console.log(accounts)
}
