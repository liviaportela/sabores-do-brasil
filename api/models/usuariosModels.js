const conexao = require('../config/conexao.js');

console.log('Acessando Models dos usuarios...')

module.exports = {
    getAll,
    getById,
    create,
    updatePassword,
    remove
}

function getAll(callback) {
    conexao.query('Select * from usuarios ', callback)
}

function getById(codigo, callback) {
    conexao.query('select * from usuarios Where id = '+ codigo, callback)
}

function create(dados, callback) {
    var msql = 'INSERT INTO usuarios SET ? '
    conexao.query(msql, dados, callback)
}

function updatePassword(senha, email, callback) {
    const query = 'UPDATE usuarios SET senha = ? WHERE email = ?'; 
    conexao.query(query, [senha, email], (erro, resultado) => {
        if (erro) {
            console.error('Erro na query de atualização de senha:', erro);
            return callback(erro, null);
        }
        callback(null, resultado);
    });
}

function remove(codigo, callback) {
    conexao.query('DELETE FROM usuarios WHERE id = '+ codigo, callback)
}