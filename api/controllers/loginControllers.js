const loginModels = require("../models/loginModels")
const path = require('path');

module.exports = {
    login,
    validarPSW
}

function login(req, res) {
    console.log('Carregando Página de Login');
    res.sendFile(path.join(__dirname, '../views/index.html')); // Ajuste o caminho conforme necessário
}

function validarPSW(req, res) {
    console.log("\nController Validar Login...")
    n_usuario = req.body.login;
    n_senha = req.body.senha;
    console.log("Usuario: " + n_usuario)
    console.log("Senha: " + n_senha)

    loginModels.validarPSW(n_usuario, n_senha, function(erro, result){
        if(erro){
            throw erro
        }
        if((result[0].usu_apelido == n_usuario) && (result[0].usu_password == n_senha)){
            console.log("Dados Válidos!")
            res.sendFile(path.join(__dirname, '../views/index.html'));
        }else{
            console.log("Dados Inválidos!")
            res.render("cadastro.ejs", {
                title: "Login",
                mensagem: "Dados Inválidos"
            })
        }

    })

}

