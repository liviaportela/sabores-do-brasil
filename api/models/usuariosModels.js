const conexao = require('../config/conexao.js');

console.log('Acessando Models dos usuarios...')

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
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

function update(dados, codigo, callback) {
    var msql = `UPDATE usuarios SET ? WHERE id = ${codigo}`
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
    conexao.query('DELETE FROM usuarios WHERE id = '+ codigo, callback)
}