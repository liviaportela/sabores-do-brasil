const express = require('express');

const router = express.Router();

const receitasControllers = require('../controllers/receitaControllers');

router.get('/dados', receitasControllers.getReceitasData);
router.get('/:id', receitasControllers.getById);
router.get('/', (req, res) => {
    if (req.query.categoria && req.query.subcategoria) {
        return receitasControllers.getBySubcategoria(req, res);
    }
    return receitasControllers.getAll(req, res);
});
router.get('/receitas-usuario/:id', receitasControllers.getReceitasByUsuario);
router.post('/', receitasControllers.create);
router.put('/:id', receitasControllers.update);
router.delete('/:id', receitasControllers.remove);

module.exports = router