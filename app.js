const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const app = express();
const path = require('path');

const loginRoutes = require('./api/routes/loginRoutes.js');
const usuariosRoutes = require('./api/routes/usuariosRoutes.js');
const receitaRoutes = require('./api/routes/receitaRoutes.js');

app.use(express.json());
app.use(fileupload());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('views', './api/views')
app.use(express.urlencoded({extended: true}))

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

app.set('view engine', 'ejs');
app.set("views",'./api/views')

const port = 3000;
 
app.use("/", loginRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/receitas', receitaRoutes);
app.use('/src', express.static(path.join(__dirname, 'src')));

app.listen(port, () => {
    console.log(`Aplicativo Rodando na Porta ${port}`);
})

const conexao = require("./api/config/conexao.js");

module.exports = app;