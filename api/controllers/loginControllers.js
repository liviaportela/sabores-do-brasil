const loginModels = require("../models/loginModels")
const path = require('path');

module.exports = {
    login,
    validarPSW,
    obterUsuario
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

    loginModels.validarPSW(n_usuario, n_senha, function (erro, result) {
        if (erro) {
            throw erro
        }
        if ((result[0].email == n_usuario) && (result[0].senha == n_senha)) {
            console.log("Dados Válidos!");

            req.session.usuario = result[0].email;
            req.session.nome = result[0].nome;
            req.session.id_usuario = result[0].id;

            console.log("Sessão criada para o usuário:", req.session.usuario);

            res.sendFile(path.join(__dirname, '../views/index.html'));
        } else {
            console.log("Dados Inválidos!")
            res.render("cadastro.ejs", {
                title: "Login",
                mensagem: "Dados Inválidos"
            })
        }
    })
}

function obterUsuario(req, res) {
    if (req.session.usuario) {
        res.json({
            nome: req.session.nome,
            email: req.session.usuario,
            id: req.session.id_usuario
        });
    } else {
        res.status(401).json({ error: 'Usuário não autenticado' });
    }
}