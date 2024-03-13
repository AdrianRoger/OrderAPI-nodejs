const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const customerRoutes = require('./customerRoutes');
const { frameGuardMiddleware } = require('../middlewares')


router.use(frameGuardMiddleware);

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/customers', customerRoutes);

module.exports = router;