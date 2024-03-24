let customers = [
    { id: 1, name: "Adrian", email: "adrian@roger.com.br" },
    { id: 2, name: "Irineu", email: "irineu@gmail.com" },
    { id: 3, name: "Tony Stark", email: "tonystark@avengers.com" }
]

const Database = require('../database/Database');
const db = new Database('customers');

const getAllCustomers = (req, res) => {
    db.readAllData( (err, data)=>{
        if(err){
            return res.status(500).json({ error : "Erro ao buscar clientes!"});
        }

        if(data.length === 0){
            return res.status(404).json({ error : "Nenhum Cliente cadastrado!"});
        }

        res.status(200).json(data);
    })
}

const getCustomerById = (req, res) => {
    const customerId = req.params.id;

    db.get(customerId, (err, data)=>{
        // console.log(value);
        if(err) {
            return res.status(500).json({error: 'Cliente não encontrado.'})
        }

        res.status(200).json({id: customerId, ...JSON.parse(data.toString())});
    });
}

const createCustomer = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Dados insuficientes!" });
    }
    const newCustomer = { name: name, email: email };

    let nextId;
    db.readAllData( (err, data)=>{
        if(err){
            return res.status(500).json({ error : "Erro ao buscar produtos!"})
        }
        nextId = data.length > 0 ? Number(data[data.length -1].id) + 1 : 1;

        db.put(nextId, JSON.stringify(newCustomer), (err)=>{
            if(err){
                return res.status(500).json({ error : "Erro ao cadastrar cliente!"});
            }
            res.status(201).json({ id : nextId, ...newCustomer });
        });
    });
}

const updateCustomer = (req, res) => {
    const customerId = parseInt(req.params.id);
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Dados insuficientes!" });
    }

    db.get(customerId, (err, data)=>{
        if(err){
            return res.status(500).json({ error : 'Cliente não encontrado.'});
        }

        const updatedCustomer = { name, email };
        db.put(customerId, JSON.stringify(updatedCustomer), (err) =>{
            if(err){
                return res.status(500).json({ error : "Erro ao atualizar o cliente!"});
            }
            res.status(200).json({ message: `Cliente com ID ${customerId} atualizado com sucesso` });
        });
    });
}

const deleteCustomer = (req, res) => {
    const customerId = req.params.id;

    db.get(customerId, (err, data)=>{
        if(err){
            return res.status(500).json({ error : 'Cliente não encontrado!'});
        }

        db.del(customerId, (err) =>{
            if(err){
                return res.status(500).json({ error: 'Erro ao excluir cliente!' });
            }
            res.status(200).json({ message : `Cliente com id ${customerId} excluído.` });
        });
    });
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    customers
}