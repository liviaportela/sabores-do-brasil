const conexao = require("../config/conexao");

console.log("Acessando Models Login ...")

module.exports = {
    validarPSW
}

function validarPSW(p_login, p_senha, callback){
    my_sql = "SELECT * FROM usuarios WHERE email = '" + p_login + "' AND senha = '" + p_senha + "' ";

    const n_sql = `SELECT * FROM usuarios WHERE email =  '${p_login}'
    AND senha = '${p_senha}'`;
    conexao.query(my_sql, callback)
}