const Database = require('../database/Database');
const db = new Database('users');
const hashPassword = require('../Utils/hashPassword');

//api/users/all (admin/GET)
const getAllUsers = (req, res) => {
    db.readAllData((err, data)=>{
        if(err){
            return res.status(500).json({error: 'Erro ao buscar usuários.' })
        }
        res.status(200).json(data);
    });
}

//users/ (admin/POST)
const createUser = async (req, res) => {
    const { username, name, password, userType }  = req.body;
    if(!username || !name || !password || !userType ){
       return res.status(400).json({error: "username, name, password e userType são campos obrigatórios!"});
    }
    const id = new Date().getTime();
    const hashedPassword = await hashPassword(password);
    const newUser = { username: username, name: name, password: hashedPassword, user_type: userType };

    db.put(id, JSON.stringify(newUser), (err)=> {
        if(err){
            res.status(500).json({ error: "Erro ao criar usuário."});
            return;
        }
        res.status(201).json({id: id, ...newUser});
    });
}

//api/users/:id(admin/GET)
const getUserById = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Parâmetro incorreto." });
    }
    db.get(id, (err, value) => {
        if(err){
            return res.status(404).json({ error : "Usuário não encontrado!"})
        }

        res.status(200).json({id:id, ...JSON.parse(value.toString())});
    });
}

//api/users/:id(admin/PUT)
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { username, name, password } = req.body;
    const userType = req.body.user_type;

    if (!id) {
        return res.status(400).json({ error: "Parâmetro incorreto." });
    }

    if (!username || !name || !password || !userType) {
        return res.status(400).json({ error: "Dados incompletos para atualizar usuário." });
    }
    const hashedPassword = await hashPassword(password);
    db.get(id, (err, value) =>{
        if(err){
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const updatedUser = { username: username, name: name, password: hashedPassword, user_type: userType };
        db.put(id, JSON.stringify(updatedUser), (err) =>{
            if(err){
                return res.status(500).json({error : 'Erro ao atualizar usuário.' });
            }
            res.status(200).json({ message : `Usuário com id ${id} atualizado.`})
        });
    });
};

//api/users/:id(admin/DELETE)
const deleteUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Parâmetro id na URL inválido." });
    }

    db.get(id, (err, data) =>{
        if(err){
            return res.status(500).json({ error : "Usuário nao encontrado!"});
        }

        db.del(id, (err) =>{
            if(err){
                return res.status(500).json({ error: 'Erro ao excluir usuário' });
            }
            res.status(200).json({ message : `Usuário com id ${id} excluído.` });
        });
    });
}


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}