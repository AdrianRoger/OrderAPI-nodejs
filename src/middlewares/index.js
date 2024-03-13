const { 
    isInteger, 
    isValidName, 
    isValidDecimalFormat, 
    checkAssociatedCustomer, 
    checkProductsArray,
    isValidEmail
} = require('./middlewares');

const frameGuardMiddleware  = require('./frameGuardMiddleware');

module.exports = {
    isInteger,
    isValidName,
    isValidDecimalFormat,
    checkAssociatedCustomer,
    checkProductsArray,
    isValidEmail,
    frameGuardMiddleware
}