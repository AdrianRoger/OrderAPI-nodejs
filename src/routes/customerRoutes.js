const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { isValidEmail } = require('../middlewares');

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/', isValidEmail, customerController.createCustomer);
router.put('/:id', isValidEmail, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;