const conexao = require('../config/conexaoReceitas.js');

console.log('Acessando Models das receitas...')

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
}


function getAll(callback) {
    conexao.query('Select * from receitas ', callback)
}

function getById(codigo, callback) {
    conexao.query('select * from receitas Where id = '+ codigo, callback)
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
