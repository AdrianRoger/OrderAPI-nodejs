const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isInteger, isValidName, isValidDecimalFormat } = require('../middlewares');

router.get('/', productController.getAllProducts);
router.get('/:id', isInteger, productController.getProductById);
router.post('/', isValidName, isValidDecimalFormat, productController.createProduct);
router.put('/:id', isInteger, isValidName, isValidDecimalFormat, productController.updateProduct);
router.delete('/:id', isInteger, productController.deleteProduct);

module.exports = router;
