let customers = [
    { id: 1, name: "Adrian", email: "adrian@roger.com.br" },
    { id: 2, name: "Irineu", email: "irineu@gmail.com" },
    { id: 3, name: "Tony Stark", email: "tonystark@avengers.com" }
]

const {
    getAllCustomersService,
    getCustomerByIdService,
    createCustomerService,
    updateCustomerService,
    deleteCustomerService
} = require('../services');

const getAllCustomers = async (req, res) => {
        try {
            const data = await getAllCustomersService();
            res.status(200).json(data);
        }catch(error){
            return res.status(500).json(error);
        }
}

const getCustomerById = async (req, res) => {
    const customerId = req.params.id;
    try{
        const data = await getCustomerByIdService(customerId);
        res.status(200).json(data);
    }catch(error){
        return res.status(404).json({ error : "Cliente não encontrado!"});
    }
}

const createCustomer = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Nome e Email são obrigatórios!" });
    }

    const newCustomer = { name: name, email: email };

    try{
        const data = await createCustomerService(newCustomer);
        res.status(201).json(data);
    }catch(error){
        res.status(500).json({error : "Erro ao cadastrar novo cliente!"});
    }
};

const updateCustomer = async (req, res) => {
    const customerId = parseInt(req.params.id);
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Dados insuficientes!" });
    }

    try{
        const data = await updateCustomerService(customerId, { name, email } );
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json({error : "Erro ao atualizar Cliente!"});
    }
};

const deleteCustomer = async (req, res) => {
    const customerId = req.params.id;
    try{
        const data = await deleteCustomerService(customerId);
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json(error);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    customers
}