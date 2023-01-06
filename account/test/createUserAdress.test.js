import { createUserAdress } from "../src/use-case/createUserAdress.js";
import { createUserUseCase } from "../src/use-case/createUserAccount.js";

createUserUseCase("Teste", "teste@email.com", "senhaTeste")
createUserUseCase("Patrick", "teste2@email.com", "senhaTeste")

console.log(createUserAdress("teste2@email.com", "Rua 1", 123, "", "Liberdade", 1550000, "São Paulo", "SP"));
