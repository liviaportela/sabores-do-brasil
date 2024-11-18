var mysql = require("mysql2");
var database = "sabores_do_brasil";
const conexao = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306
});

conexao.connect((err) => {
    if (err) {
        console.log("Erro ao conectar no MySQL...");
        console.error(err.message);
        return;
    }

    console.log("\nConexão estabelecida com sucesso.");

    conexao.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err) => {
        if (err) {
            console.log("Erro ao criar banco de dados:", err.message);
            return;
        }

        conexao.query(`USE ${database}`, (err) => {
            if (err) {
                console.log("Erro ao selecionar banco de dados:", err.message);
                return;
            }

            const tabelaUsuarios = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nome VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    senha VARCHAR(255) NOT NULL,
                    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            conexao.query(tabelaUsuarios, (err) => {
                if (err) {
                    console.log("Erro ao criar tabela usuarios:", err.message);
                    return;
                }
            });

            const tabelaReceitas = `
                CREATE TABLE IF NOT EXISTS receitas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    titulo VARCHAR(255) NOT NULL,
                    ingredientes TEXT(2000) NOT NULL,
                    preparo TEXT(2000) NOT NULL,
                    categoria ENUM('Massas', 'Comidas Típicas', 'Doces', 'Salgados') NOT NULL,
                    subcategoria ENUM('Macarrão', 'Pizza', 'Salgados', 'Doces', 'Brigadeiros', 'Sorvetes', 'Fritos', 'Assados') NOT NULL,
                    imagem VARCHAR(255),
                    usuario_id INT,
                    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
                )
            `;
            conexao.query(tabelaReceitas, (err) => {
                if (err) {
                    console.log("Erro ao criar tabela receitas:", err.message);
                    return;
                }
            });
        });
    });
});

module.exports = conexao;