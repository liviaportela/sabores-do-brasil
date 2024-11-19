const usuariosModels = require('../models/usuariosModels.js');

module.exports = {
    getAll,
    getById,
    create,
    updatePasswordByEmail,
    remove
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
            return res.status(404).send('Usuário não encontrado');
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
            res.redirect('../src/pages/forms/login.html');
        }
    });
}

function updatePasswordByEmail(req, res) {
    const { email, senha } = req.body;

    usuariosModels.updatePassword(senha, email, function (err, result) {
        if (err) {
            console.error('Erro ao atualizar a senha:', err);
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a senha.' });
        }
        
        res.json({ success: true, message: 'Senha atualizada com sucesso.' });
    });
}

function remove(req, res) {
    const cod = req.session.id_usuario;
    usuariosModels.remove(cod, function (err, resultado) {
        if (err) {
            throw err;
        } 
        
        req.session.destroy((err) => {
                if (err) {
                    return res.status(500).send('Erro ao destruir sessão');
                }
                return res.json(resultado);
        })
    });
}