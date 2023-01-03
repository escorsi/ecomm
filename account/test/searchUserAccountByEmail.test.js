import { searchUserAccountByEmail } from "../src/use-case/searchUserAccountByEmail.js";

if (!searchUserAccountByEmail("teste@email.com")) {
    console.log("Não foi possível encontrar esta conta!");
} else {
    console.log(searchUserAccountByEmail("teste@email.com"));
}
