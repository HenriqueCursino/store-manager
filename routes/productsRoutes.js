const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

// req 2
router.get('/:id', productsController.getProductById);

// req 3
router.put('/:id', productsController.updateProduct);

// req 4
router.delete('/:id', productsController.deleteProduct);

// req 2
router.get('/', productsController.getAllProducts);

// req 1
router.post('/', productsController.addProduct);

module.exports = router;
