const formatOrder = require('../Utils/formatOrder');

let orders = [
    { id: 1, customer: 1, items: [{ id: 1, quantity: 3 }, { id: 3, quantity: 2 }] },
    { id: 2, customer: 2, items: [{ id: 2, quantity: 1 }, { id: 1, quantity: 4 }] },
    { id: 3, customer: 3, items: [{ id: 4, quantity: 2 }, { id: 3, quantity: 1 }] }
];

let nextId = orders.length + 1;

const getAllOrders = (req, res) => {
    let resOrders = [];

    orders.forEach(order => {
        resOrders.push(formatOrder(order));
    })

    res.status(404).json(resOrders);
};

const getOrder = (req, res) => {
    const orderId = parseInt(req.params.id);
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ error: "Pedido não encontrado!!" });
    }

    res.status(200).json(formatOrder(orders[orderIndex]));
}

const getOrdersBySearch = (req, res) => {
    const produtctId = parseInt(req.query.product_id);
    const customerId = parseInt(req.query.customer_id);
    let resultOrders = [];

    if (produtctId) {
        orders.forEach(order => {
            const index = order.items.findIndex(item => item.id === produtctId);
            if(index !== -1){
                resultOrders.push(formatOrder(order));
            }
        });
        
        if(resultOrders.length > 0){
            return res.status(200).json(resultOrders);
        }

        return res.status(404).json({error:"Nenhum pedido encontrado."});
    }

    if (customerId) {
        orders.forEach(order =>{
            if(order.customer === customerId){
                resultOrders.push(formatOrder(order));
            }
        })

        if(resultOrders.length > 0){
            return res.status(200).json(resultOrders);
        }
    
        return res.status(404).json({ error: "Nenhum pedido encontrado." });
    }

    res.status(400).json({ error: "Parâmetro de pesquisa incorreto!" });
}

const createOrder = (req, res) => {
    const { customer, items } = req.body;

    const newOrder = { id: nextId++, customer: customer, items: items };
    orders.push(newOrder);
    res.status(201).json({ message: "Pedido criado com sucesso!" });
}

const updateOrder = (req, res) => {
    const orderId = parseInt(req.params.id);
    const { customer, items } = req.body;

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ error: "Pedido não encontrado!" });
    }

    orders[orderIndex] = { ...orders[orderIndex], customer, items };
    res.status(200).json({ message: `Pedido com ID ${orderId} atualizado com sucesso.` });
}

const deleteOrder = (req, res) => {
    const orderId = parseInt(req.params.id);

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ error: "Pedido não encontrado!" });
    }

    orders = orders.filter(order => order.id !== orderId);
    res.status(204).json({ message: `Pedido com ID ${orderId} deletado com sucesso.` });
}


module.exports = {
    getAllOrders,
    getOrder,
    getOrdersBySearch,
    createOrder,
    updateOrder,
    deleteOrder
};


