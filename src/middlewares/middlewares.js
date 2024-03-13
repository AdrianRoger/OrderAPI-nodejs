const { customers } = require('../controllers/customerController');
const { products } = require('../controllers/productController');

const isInteger = (req, res, next) => {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "O id dev ser um número inteiro" });
    }

    next();
}

const isValidName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'O atributo name é obrigatório.' });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
        return res.status(400).json({ error: 'O atributo name deve ter pelo menos 3 caracteres.' });
    }

    next();
};

const isValidDecimalFormat = (req, res, next) => {
    const { value } = req.body;

    if (!value) {
        return res.status(400).json({ error: 'O atributo value é obrigatório.' });
    }

    if (value === undefined || isNaN(value)) {
        return res.status(400).json({ error: 'O valor deve ser um número.' });
    }

    if (!/^\d+(\.\d{2})$/.test(value)) {
        return res.status(400).json({ error: 'O valor deve ter duas casas decimais.' });
    }

    if (/^\d+(\,\d{2})$/.test(value)) {
        return res.status(400).json({ error: 'A separação das casas decimais deve ser feita com ponto.' });
    }

    next();
}

const checkAssociatedCustomer = (req, res, next) => {
    const { customer } = req.body;

    if (!customer) {
        return res.status(400).json({ error: "O atributo customer é obrigatório." });
    }

    const customerIndex = customers.findIndex(cus => cus.id === customer);
    if (customerIndex === -1) {
        return res.status(422).json({ error: "Cliente não cadastrado" });
    }

    next();
}

const checkProductsArray = (req, res, next) => {
    const { items } = req.body;

    if (!items) {
        return res.status(400).json({ error: "O atributo items é obrigatório" });
    }

    if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'O atributo items deve ser um array.' });
    }

    if (items.length === 0) {
        return res.status(400).json({ error: "O pedido deve conter pelo menos 1 item." });
    }

    const nonExistingProducts = [];
    items.forEach(item => {
        const ref = products.findIndex(product => product.id === item.id);
        if (ref === -1) {
            nonExistingProducts.push(item.id);
        }
    });

    if (nonExistingProducts.length > 0) {
        return res.status(422).json({ error: `Produtos com IDs ${nonExistingProducts.join(',')} não cadastrados.` });
    }

    next();
}

const isValidEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "O atributo email deve existir." });
    }

    const emailRegex = /^[^\s@]{3,}@[^@]{3,}\.[^\s@]{2,3}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'O e-mail informado não está em um formato válido.' });
    }

    next();
}

module.exports = {
    isInteger,
    isValidName,
    isValidDecimalFormat,
    checkAssociatedCustomer,
    checkProductsArray,
    isValidEmail
};
