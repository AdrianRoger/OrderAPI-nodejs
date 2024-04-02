const { getCustomerByIdService, getAllProductsService  } = require('../services');

async function formatOrder(order) {
    const customer = await getCustomerByIdService(order.customer);
    const products = await getAllProductsService();

    let orderItems = [];
    order.items.forEach(item => {
        const prodIndex = products.findIndex(prod => Number(prod.id) === Number(item.id));
        orderItems.push({ product: products[prodIndex], quantity: item.quantity });
    })

    return { id: order.id, customer: customer, items: orderItems };
}

module.exports = formatOrder;