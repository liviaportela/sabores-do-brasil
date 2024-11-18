const conexao = require('../config/conexao.js');

console.log('Acessando Models das receitas...')

module.exports = {
    getAll,
    getById,
    getBySubcategoria,
    getReceitasByUsuario,
    create,
    update,
    remove,
}

function getAll(callback) {
    conexao.query('Select * from receitas ', callback)
}

function getById(id, callback) {
    const msql = `SELECT * FROM receitas WHERE id = ?`;
    conexao.query(msql, [id], callback);
}

function getBySubcategoria(categoria, subcategoria, callback) {
    const msql = 'SELECT * FROM receitas WHERE categoria = ? AND subcategoria = ?';
    conexao.query(msql, [categoria, subcategoria], callback);
}

function getReceitasByUsuario(usuario_id, callback) {
    const msql = 'SELECT * FROM receitas WHERE usuario_id = ?';
    conexao.query(msql, [usuario_id], (erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar receitas:", erro);
            return callback(erro, null);
        }
        callback(null, resultados);
    });
}

function create(dados, callback) {
    var msql = 'INSERT INTO receitas SET ? '
    conexao.query(msql, dados, callback)
}

function update(dados, codigo, callback) {
    var msql = `UPDATE receitas SET ? WHERE id = ${codigo}`
    console.log(msql)
    conexao.query(msql, dados, (erro, callback) => {
        if(erro) {
            throw erro
        }
        else{
            console.log('Registro ' + codigo + ' Atualizado!')
        }
    })
}

function remove(codigo, callback) {
    conexao.query('DELETE FROM receitas WHERE id = '+ codigo, callback)
}