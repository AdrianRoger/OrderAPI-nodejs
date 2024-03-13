const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isInteger, isValidName } = require('../middlewares');

router.get('/', productController.getAllProducts);
router.get('/:id', isInteger, productController.getProduct);
router.post('/', isValidName, productController.createProduct);
router.put('/:id', isInteger, isValidName, productController.updateProduct);
router.delete('/:id', isInteger, productController.deleteProduct);

module.exports = router;
