const accounts = []

function createUserUseCase(nome, email, senha) {
    const usuario = {
        id: accounts.length + 1,
        name: nome,
        email: email,
        password: senha,
        createdDate: new Date().toLocaleDateString('pt-BR')
    }
    accounts.push(usuario);
    return usuario;
}

export{accounts, createUserUseCase}