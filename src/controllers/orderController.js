const formatOrder = require('../Utils/formatOrder');
let orders = [
    { id: 1, customer: 1, items: [{ id: 1, quantity: 3 }, { id: 3, quantity: 2 }] },
    { id: 2, customer: 2, items: [{ id: 2, quantity: 1 }, { id: 1, quantity: 4 }] },
    { id: 3, customer: 3, items: [{ id: 4, quantity: 2 }, { id: 3, quantity: 1 }] }
];

const {
    getAllOrdersService,
    getOrderByIdService,
    getOrdersBySearchService,
    createOrderService,
    updateOrderService,
    deleteOrderService
} = require('../services');
const {customers} = require("./customerController");

const getAllOrders = async (req, res) => {
    try {
        const data = await getAllOrdersService();
        for(const order of data){
            data[data.indexOf(order)] = await formatOrder(order);
        }
        res.status(200).json(data);
    }catch(error){
        return res.status(500).json(error);
    }
};

const getOrder = async (req, res) => {
    try{
        const orderId = req.params.id
        const order = await formatOrder( await getOrderByIdService(orderId));
        res.status(200).json(order);
    }catch(error){
        return res.status(404).json({ error: "Pedido não encontrado!!" });
    }
}

const getOrdersBySearch = async (req, res) => {
    const productId = parseInt(req.query.product_id);
    const customerId = parseInt(req.query.customer_id);
    try{
        let data
        let searchType;
        if (productId) {
            data = await getOrdersBySearchService(1, productId);
            searchType = 'product';
        }else if(customerId) {
            data = await getOrdersBySearchService(2, customerId);
            searchType = 'customer';
        }else{
            return res.status(400).json({ error: "Parâmetro de pesquisa incorreto!" });
        }

        if(data.error){
            return res.status(404).json({error:`Nenhum pedido encontrado para o ${searchType} com ID ${productId || customerId}.`});
        }

        for(const order of data){
            data[data.indexOf(order)] = await formatOrder(order);
        }

        return res.status(200).json(data);
    }catch(error){
        return res.status(400).json({error});
    }
}

const createOrder = async (req, res) => {
    try{
        const { customer, items } = req.body;
        const order = await createOrderService({customer, items});
        res.status(201).json(await formatOrder(order));
    } catch ( error ){
        res.status(500).json({ error });
    }
}

const updateOrder = async (req, res) => {
    try{
        const orderId = parseInt(req.params.id);
        const { customer, items } = req.body;
        const updatedOrder = await updateOrderService(orderId, { customer, items });
        res.status(200).json(await formatOrder(updatedOrder));
    }catch(error){
        res.status(500).json({ error });
    }
    // res.status(200).json({ message: `Pedido com ID ${orderId} atualizado com sucesso.` });
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    try{
        const data = await deleteOrderService(orderId);
        res.status(200).json(data);
    }catch(error){
        res.status(404).json(error);
    }
}

// const deleteProduct = async (req, res) => {
//     const productId = req.params.id || null;
//
//     try{
//         const data = await deleteProductService(productId);
//         return res.status(200).json(data);
//     }catch(error){
//         return res.status(500).json(error);
//     }
// };

module.exports = {
    getAllOrders,
    getOrder,
    getOrdersBySearch,
    createOrder,
    updateOrder,
    deleteOrder
};