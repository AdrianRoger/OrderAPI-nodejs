let customers = [
    { id: 1, name: "Adrian", email: "adrianroge@alpha.org.br" },
    { id: 2, name: "Irineu", email: "irineu@gmail.com" },
    { id: 3, name: "Tony Stark", email: "tonystark@avengers.com" }
]

let nextId = customers.length + 1;

const getAllCustomers = (req, res) => {
    res.json({ customers });
}

const getCustomer = (req, res) => {
    const customerId = parseInt(req.params.id);

    const customerIndex = customers.findIndex(customer => customer.id === customerId);

    if (customerIndex === -1) {
        return res.json({ error: "Cliente não encontrado!" });
    }

    res.json(customers[customerIndex]);
}

const createCustomer = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json({ error: "Dados insuficientes!" });
    }

    const newCustomer = { id: nextId++, name: name, email: email };
    customers.push(newCustomer);
    res.json({ message: "Cliente adicionado com sucesso." });
}

const updateCustomer = (req, res) => {
    const customerId = parseInt(req.params.id);

    const customerIndex = customers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) {
        return res.json({ error: "Cliente não encontrado!" });
    }

    const { name, email } = req.body;
    if (!name || !email) {
        return res.json({ error: "Dados insuficientes!" });
    }

    customers[customerIndex] = { ...customers[customerIndex], name: name, email: email };
    res.json({ message: `Cliente com ID ${customerId} atualizado com sucesso` });
}

const deleteCustomer = (req, res) => {
    const customerId = parseInt(req.params.id);

    const customerIndex = customers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) {
        return res.json({ error: "Cliente não encontrado." });
    }

    customers = customers.filter(customer => customer.id !== customerId);
    res.json({message : `Cliente com ID ${customerId} apagado com sucesso.`});
}

module.exports = {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    customers
}