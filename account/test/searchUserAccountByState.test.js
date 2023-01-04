import { searchUserAccountByState } from "../src/use-case/searchUserAccountByState.js";
import { createUserUseCase } from "../src/use-case/createUserAccount.js";
import { createUserAdress } from "../src/use-case/createUserAdress.js";

createUserUseCase("Teste", "teste@email.com", "senhaTeste")
createUserUseCase("Patrick", "teste2@email.com", "senhaTeste")
createUserUseCase("AAAAA", "teste3@email.com", "senhaTeste")

createUserAdress("teste2@email.com", "Rua 1", 123, "", "Liberdade", 1550000, "São Paulo", "SP");
createUserAdress("teste3@email.com", "Rua 1", 123, "", "Vila Olinda", 1550000, "São Paulo", "SP");
createUserAdress("teste@email.com", "Rua 2", 444, "", "Centro", 44444, "Curitiba", "PR");


console.log(searchUserAccountByState("SP"));