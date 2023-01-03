import { changeUserNameUseCase } from "../src/use-case/changeUserName.js";
import { createUserUseCase } from "../src/use-case/createUserAccount.js";

createUserUseCase("Teste", "teste@email.com", "senhaTeste")
console.log("Nome alterado com sucesso! \n");
console.log(changeUserNameUseCase("teste@email.com", "Patrick"));
