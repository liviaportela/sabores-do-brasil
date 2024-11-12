const receitaModels = require('../models/receitaModels.js');
const path = require('path');

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getReceitasData,
};

function getAll(req, res) {
    receitaModels.getAll(function (err, resultado) {
        if (err) {
            throw err;
        } else {
            return res.json(resultado);
        }
    });
};

function getReceitasData(req, res) {
    receitaModels.getAll(function (err, resultado) {
        if (err) {
            throw err;
        } else {
            res.json(resultado);
        }
    });
}


function getById(req, res) {
    const cod = req.params.id;
    receitaModels.getById(cod, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            return res.json(resultado);
        }
    });
}

function create(req, res) {
    const dados = req.body;
    receitaModels.create(dados, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            res.redirect('/receitas'); // Redireciona para a lista de usuários após o cadastro
        }
    });
}

function update(req, res) {
    const cod = req.params.id;
    const dados = req.body;
    receitaModels.update(dados, cod, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            res.redirect('/receitas');
        }
    });
}

function remove(req, res) {
    const cod = req.params.id;
    receitaModels.remove(cod, function (err, resultado) {
        if (err) {
            throw err;
        } else {
            return res.json(resultado);
        }
    });
}