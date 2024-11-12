const usuariosModels = require('../models/usuariosModels.js');

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};

function getAll(req, res) {
    usuariosModels.getAll(function (err, resultado) {
        if (err) {
            throw err;
        } else {
            return res.json(resultado);
        }
    });
};

function getById(req, res) {
    const cod = req.params.id;
    usuariosModels.getById(cod, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            return res.json(resultado);
        }
    });
}

function create(req, res) {
    const dados = req.body;
    usuariosModels.create(dados, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            res.redirect('/usuarios'); // Redireciona para a lista de usuários após o cadastro
        }
    });
}

function update(req, res) {
    const cod = req.params.id;
    const dados = req.body;
    usuariosModels.update(dados, cod, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            res.redirect('/usuarios');
        }
    });
}

function remove(req, res) {
    const cod = req.params.id;
    usuariosModels.remove(cod, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            return res.json(resultado);
        }
    });
}