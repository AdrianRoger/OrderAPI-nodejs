const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const customerRoutes = require('./customerRoutes');
const { frameGuardMiddleware } = require('../middlewares');
const { isLogged } = require('../middlewares');


router.use(frameGuardMiddleware);

router.use('/login', loginRoutes);

router.use(isLogged);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/customers', customerRoutes);


module.exports = router;