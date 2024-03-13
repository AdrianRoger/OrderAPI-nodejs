let products = [
    { id: 1, name: 'abacate', value: "2.99" },
    { id: 2, name: 'laranja', value: "1.99" },
    { id: 3, name: 'maçã', value: "0.99" },
    { id: 4, name: 'melão', value: "3.99" },
    { id: 5, name: 'melancia', value: "5.00"}
];

let nextId = products.length + 1;

const getAllProducts = (req, res) => {
    res.json(products);
}

const getProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    const productIndex = products.findIndex((prod) => prod.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Produto não encontrado!!" });
    }
    
    res.json(products[productIndex]);

}

const createProduct = (req, res) => {
    const { name, value } = req.body;

    if (!name || !value) {
        return res.status(400).json({ error: "Dados insuficientes!!" });
    }

    const formatedValue = parseFloat(value).toFixed(2);

    const newProduct = { id: nextId++, name, value: formatedValue };
    products.push(newProduct);
    res.status(200).json(newProduct);
}

const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, value } = req.body;

    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Produto Não econtrado!!" });
    }

    const formatedValue = parseFloat(value).toFixed(2);

    products[productIndex] = { ...products[productIndex], name, value: formatedValue };
    res.json({ message: `Produto com ID ${productId} atualizado` });
}

const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    //Cria um novo array excluindo o ID selecionado
    products = products.filter((product) => product.id !== productId);

    res.json({ message: `Produto com ID ${productId} removido!!` });
}


module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    products
}

