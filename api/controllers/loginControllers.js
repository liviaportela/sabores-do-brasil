const loginModels = require("../models/loginModels")
const path = require('path');

module.exports = {
    login,
    validarPSW,
    obterUsuario
}

function login(req, res) {
    console.log('Carregando Página Inicial');
    res.sendFile(path.join(__dirname, '../views/index.html'));
}

function validarPSW(req, res) {
    console.log("\nController Validar Login...")
    n_usuario = req.body.login;
    n_senha = req.body.senha;

    loginModels.validarPSW(n_usuario, n_senha, function (erro, result) {
        if (erro) {
            return res.status(500).send('Erro ao verificar usuário');
        }
        if (!result || result.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        if ((result[0].email == n_usuario) && (result[0].senha == n_senha)) {
            req.session.usuario = result[0].email;
            req.session.nome = result[0].nome;
            req.session.id_usuario = result[0].id;

            res.sendFile(path.join(__dirname, '../views/index.html'));
        } else {
            console.log("Dados Inválidos!")
            res.render("cadastro.ejs", {
                title: "Login",
                mensagem: "Dados Inválidos"
            })
            return res.status(401).send('Senha incorreta');
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
        return res.status(401).send('Usuário não autenticado');
    }
}