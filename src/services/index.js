const {
   getAllCustomersService, getCustomerByIdService,
   createCustomerService, updateCustomerService, deleteCustomerService
} = require('./customerService');

const {
   getAllProductsService, getProductByIdService,
   createProductService, updateProductService, deleteProductService
} = require('./productService');

const {
   getAllOrdersService,getOrderByIdService, getOrdersBySearchService,
   createOrderService, updateOrderService, deleteOrderService
} = require('./orderService');

module.exports = {
   getAllCustomersService, getCustomerByIdService,
   createCustomerService, updateCustomerService, deleteCustomerService,
   //--
   getAllProductsService, getProductByIdService,
   createProductService, updateProductService, deleteProductService,
   //--
   getAllOrdersService, getOrderByIdService, getOrdersBySearchService,
   createOrderService, updateOrderService, deleteOrderService
}