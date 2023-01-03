import { removeUserUseCase } from "../src/use-case/removeUserAccount.js";
import { accounts } from "../src/use-case/createUserAccount.js";

if (!removeUserUseCase("teste@email.com")) {
    console.log("Não foi possível remover esta conta!");
} else {
    console.log("Conta removida com sucesso! \n");
    console.log("Contas existentes: \n");
    console.log(accounts)
}
