const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// req 6 - Listar vendas pelo ID
router.get('/:id', salesController.getSaleById);

// req 7 - Atualizar venda
router.put('/:id', salesController.updateSale);

// req 8 - Deletar vendas
router.delete('/:id', salesController.deleteSale);

// req 5 - Cadastrar vendas
router.post('/', salesController.addSale);

// req 6 - Listar as vendas
router.get('/', salesController.getAllSales);

module.exports = router;
