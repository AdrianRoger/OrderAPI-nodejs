const Database = require('../database');
const db = new Database('users');
const crypto = require('crypto');
const hashPassword = require('../Utils/hashPassword');

//api/user/all(admin/GET)
const getAllUsers = (req, res) => {
    db.readAllData((err, data)=>{
        if(err){
            return res.status(500).json({error: 'Erro ao buscar usuários.' })
        }
        res.status(200).json(data);
    });
}

//rota user/ (admin/POST)
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
        res.status(201).json(newUser);
    });
}

//api/login/:username(admin/GET)
// const getUserByUsername = (req, res) => {
//     const username = req.params.username;
//
//     if (!username) {
//         return res.status(400).json({ error: "Parâmetro incorreto." });
//     }
//
//     const index = dbUsers.findIndex(user => user.username === username);
//     if (index === -1) {
//         return res.status(404).json({ error: "Usuário não encontrado." });
//     }
//
//     res.status(200).json(dbUsers[index]);
// }

//api/login/:username(admin/PUT)
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { newUsername, name, password, userType } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Parâmetro incorreto." });
    }

    if (!newUsername || !name || !password || !userType) {
        return res.status(400).json({ error: "Dados incompletos para atualizar usuário." });
    }
    const hashedPassword = await hashPassword(password);
    db.get(id, (err, value) =>{
        if(err){
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const updatedUser = { username: newUsername, name: name, password: hashedPassword, user_type: userType };
        db.put(id, JSON.stringify(updatedUser), (err) =>{
            if(err){
                return res.status(500).json({error : 'Erro ao atualizar usuário.' });
            }
            res.status(200).json({ message : `Usuário com id ${id} atualizado.`})
        });
    });
};

//api/login:username(admin/DELETE)
const deleteUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Parâmetro username obrigatório." });
    }

    db.del(id, (err) =>{
        if(err){
            return res.status(500).json({ error: 'Erro ao excluir usuário'});
        }
        res.status(200).json({message : `Usuário com id ${id} excluído.`});
    })
}


module.exports = {
    getAllUsers,
    createUser,
    // getUserByUsername,
    updateUser,
    deleteUser
}