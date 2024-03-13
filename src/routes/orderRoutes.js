const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isInteger, checkAssociatedCustomer } = require('../middlewares');

router.get('/search', orderController.getOrdersBySearch);

router.get('/', orderController.getAllOrders);
router.get('/:id', isInteger, orderController.getOrder);
router.post('/', checkAssociatedCustomer, orderController.createOrder);
router.put('/:id', isInteger, checkAssociatedCustomer, orderController.updateOrder);
router.delete('/:id', isInteger, orderController.deleteOrder);

module.exports = router;