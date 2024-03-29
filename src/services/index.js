const {
   getAllCustomersService,
   getCustomerByIdService,
   createCustomerService,
   updateCustomerService,
   deleteCustomerService
} = require('./customerService');

const {
   getAllProductsService,
   getProductByIdService,
   createProductService,
   updateProductService,
   deleteProductService
} = require('./productService');




module.exports = {
   getAllCustomersService, getCustomerByIdService,
   createCustomerService, updateCustomerService, deleteCustomerService,
   //--
   getAllProductsService, getProductByIdService,
   createProductService, updateProductService, deleteProductService,
}