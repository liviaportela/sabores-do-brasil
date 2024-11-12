const conexao = require("../config/conexao")

console.log("Acessando Models Login ...")

module.exports = {
    validarPSW
}

function validarPSW(p_login, p_senha, callback){
    m_sql = "SELECT * FROM usuarios WHERE usu_apelido = '" + p_login + "' AND usu_password = '" + p_senha + "' ";

    const n_sql = `SELECT * FROM usuarios WHERE usu_apelido =  '${p_login}'
    AND usu_password = '${p_senha}'`;
    

    console.log("SQL: " + n_sql)

    conexao.query(n_sql, callback)
}
