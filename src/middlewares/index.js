const { 
    isInteger, 
    isValidName, 
    isValidDecimalFormat, 
    checkAssociatedCustomer, 
    checkProductsArray,
    isValidEmail
} = require('./middlewares');

const frameGuardMiddleware  = require('./frameGuardMiddleware');
const corsMiddleware = require('./corsMiddleware');
const { isLogged,checkAdminPermission } = require('./sessionMiddlewares');

module.exports = {
    isInteger,
    isValidName,
    isValidDecimalFormat,
    checkAssociatedCustomer,
    checkProductsArray,
    isValidEmail,
    frameGuardMiddleware,
    corsMiddleware,
    isLogged,
    checkAdminPermission
}