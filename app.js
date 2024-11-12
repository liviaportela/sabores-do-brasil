const express = require('express');
const app = express();
const path = require('path');

const loginRoutes = require('./api/routes/loginRoutes.js');
const usuariosRoutes = require('./api/routes/usuariosRoutes.js');

app.use(express.json());
app.use(express.static('public'));
app.set('views', './api/views')
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set("views",'./api/views')

const port = 3000;
 
app.use("/", loginRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/src', express.static(path.join(__dirname, 'src')));

app.listen(port, () => {
    console.log(`Aplicativo Rodando na Porta ${port}`);
})

const conexao = require("./api/config/conexao.js");

module.exports = app;