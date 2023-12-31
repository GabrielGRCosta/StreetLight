// entityRoutes.js
const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

// Rota para criação de entidade
router.post('/', entityController.createEntity);

// Rota para obter todas as entidades
router.get('/', entityController.getEntities);

router.get('/:id', entityController.getEntity);

// Rota para remover uma entidade
router.delete('/:id', entityController.removeEntity);

// Rota para atualizar uma entidade
router.patch('/:id', entityController.updateEntity);

module.exports = router;
