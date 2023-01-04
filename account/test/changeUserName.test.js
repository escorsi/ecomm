import { changeUserNameUseCase } from "../src/use-case/changeUserName.js";
import { createUserUseCase } from "../src/use-case/createUserAccount.js";

createUserUseCase("Teste", "teste@email.com", "senhaTeste")
createUserUseCase("Alura", "alura@email.com", "senhaAlura")
console.log(changeUserNameUseCase("teste@email.com", "Patrick"));
console.log(changeUserNameUseCase("alura@email.com", "Sprint"));

