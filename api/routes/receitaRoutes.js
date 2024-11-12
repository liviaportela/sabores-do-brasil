const express = require('express');

const router = express.Router();

const receitasControllers = require('../controllers/receitaControllers');


router.get('/dados', receitasControllers.getReceitasData);
router.get('/', receitasControllers.getAll);
router.get('/:id', receitasControllers.getById);
router.post('/', receitasControllers.create);
router.put('/:id', receitasControllers.update);
router.delete('/:id', receitasControllers.remove);

module.exports = router