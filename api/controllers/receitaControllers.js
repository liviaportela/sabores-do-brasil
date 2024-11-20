const receitaModels = require('../models/receitaModels.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    getAll,
    getById,
    getBySubcategoria,
    getReceitasByUsuario,
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

function getBySubcategoria(req, res) {
    const { categoria, subcategoria } = req.query;

    if (!categoria || !subcategoria) {
        return res.status(400).json({ error: 'Categoria e subcategoria são obrigatórias.' });
    }

    receitaModels.getBySubcategoria(categoria, subcategoria, (err, results) => {
        if (err) {
            console.error('Erro ao buscar receitas:', err);
            return res.status(500).json({ error: 'Erro ao buscar receitas.' });
        }
        res.json(results);
    });
}

function getReceitasByUsuario(req, res) {
    const usuarioId = req.params.id;

    if (!usuarioId) {
        return res.status(400).send('ID do usuário não fornecido.');
    }

    console.log("Buscando receitas para o usuário com ID:", usuarioId);

    receitaModels.getReceitasByUsuario(usuarioId, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar receitas:", erro);
            return res.status(500).json({ error: 'Erro ao buscar receitas' });
        }

        if (resultados.length === 0) {
            console.log("Nenhuma receita encontrada para o usuário:", usuarioId);
            return res.json([]);
        }
        res.json(resultados);
    });
}

function create(req, res) {
    const dados = req.body;
    const imagem = req.files.imagem;

    const usuarioId = req.session.id_usuario;

    if (!usuarioId) {
        return res.status(400).send('ID do usuário não fornecido.');
    }

    dados.usuario_id = usuarioId;

    const uploadDir = path.join(__dirname, '..', '..', 'uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, imagem.name);

    imagem.mv(uploadPath, (err) => {
        if (err) {
            console.error('Erro ao mover o arquivo:', err);
            return res.status(500).send('Erro ao salvar o arquivo.');
        }

        dados.imagem = imagem.name;

        receitaModels.create(dados, function (err, resultado) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
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
