const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;