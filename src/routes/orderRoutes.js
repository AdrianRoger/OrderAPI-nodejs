const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isInteger } = require('../middlewares');

router.get('/search', orderController.getOrdersBySearch);

router.get('/', orderController.getAllOrders);
router.get('/:id', isInteger, orderController.getOrder);
router.post('/', orderController.createOrder);
router.put('/:id', isInteger, orderController.updateOrder);
router.delete('/:id', isInteger, orderController.deleteOrder);

module.exports = router;