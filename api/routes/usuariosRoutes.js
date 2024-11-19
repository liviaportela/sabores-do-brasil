const express = require('express');

const router = express.Router();

const controllerusers = require('../controllers/usuariosControllers');

// Rota para renderizar a página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs');
});

router.get('/', controllerusers.getAll);
router.get('/:id', controllerusers.getById);
router.post('/', controllerusers.create);
router.put('/alterar-senha', controllerusers.updatePasswordByEmail);
router.delete('/:id', controllerusers.remove);

module.exports = router