const express = require('express');

const router = express.Router();

const controllerslogin = require('../controllers/loginControllers.js');

router.get('/', controllerslogin.login);
router.post('/validar', controllerslogin.validarPSW);
router.get('/usuario', controllerslogin.obterUsuario);

module.exports = router