const { customers } = require('../controllers/customerController');
const { products } = require('../controllers/productController');


function formatOrder(order) {
    const customerIndex = customers.findIndex(cus => cus.id === order.customer);
    const customer = customers[customerIndex];

    let orderItems = [];
    order.items.forEach(item => {
        const prodIndex = products.findIndex(prod => prod.id === item.id);
        orderItems.push({ product: products[prodIndex], quantity: item.quantity });
    })

    return { id: order.id, customer: customer, items: orderItems };
}

module.exports = formatOrder;