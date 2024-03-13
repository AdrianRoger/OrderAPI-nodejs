const { products } = require('./productController');

let orders = [
    { id: 1, items: [{ id: 1, quantity: 3 }, { id: 3, quantity: 2 }] },
    { id: 2, items: [{ id: 2, quantity: 1 }, { id: 1, quantity: 4 }] },
    { id: 3, items: [{ id: 4, quantity: 2 }, { id: 3, quantity: 1 }] }
];

let nextId = orders.length + 1;

const getAllOrders = (req, res) => res.json(orders);

const getOrder = (req, res) => {
    const orderId = parseInt(req.params.id);

    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex === -1) {
        return res.json({ error: "Pedido não encontrado!!" })
    }

    res.json(orders[orderIndex]);
}

const createOrder = (req, res) => {
    const { items } = req.body;

    if (items.length === 0) {
        return res.json({ error: "Dados insuficientes!!" });
    }

    const nonExistingProducts = [];
    items.forEach(item => {
        const ref = products.findIndex(product => product.id === item.id);
        if (ref === -1) {
            nonExistingProducts.push(item.id);
        }
    });

    if (nonExistingProducts.length > 0) {
        return res.json({ error: `Produtos com IDs ${nonExistingProducts.join(',')} não cadastrados.` });
    }

    const newOrder = { id: nextId++, items: items };
    orders.push(newOrder);
    res.json({ message: "Pedido criado com sucesso!" });
}

const updateOrder = (req, res) => {
    const orderId = parseInt(req.params.id);
    const { items } = req.body;

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.json({ error: "Pedido não encontrada!" });
    }

    if (items.length === 0) {
        return res.json({ error: "Dados insuficientes!!" });
    }

    const nonExistingProducts = [];
    items.forEach(item => {
        const ref = products.findIndex(product => product.id === item.id);
        if (ref === -1) {
            nonExistingProducts.push(item.id);
        }
    });

    if (nonExistingProducts.length > 0) {
        return res.json({ error: `Produtos com IDs ${nonExistingProducts.join(',')} não cadastrados.` });
    }

    orders[orderIndex] = { ...orders[orderIndex], items };
    res.json({ message: `Pedido com ID ${orderId} atualizado com sucesso.` });
}

const deleteOrder = (req, res) => {
    const orderId = parseInt(req.params.id);

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.json({ error: "Pedido não encontrado!" });
    }

    orders = orders.filter(order => order.id !== orderId);
    res.json({ message: `Pedido com ID ${orderId} deletado com sucesso.` });
}


module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
};


