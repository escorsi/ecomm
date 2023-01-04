import { createUserUseCase } from "../src/use-case/createUserAccount.js";

console.log(createUserUseCase("Teste", "teste@email.com", "senhaTeste"));
console.log(createUserUseCase("Patrick", "patrick@email.com", "senhaPatrick"));
console.log(createUserUseCase("Alura", "alura@email.com", "senhaAlura"));