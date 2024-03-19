let dbUsers = require('../database/dbUsers');

let nextId = dbUsers.length + 1;
const error = "Sem permissão para realizar esta requisição";

//api/user/all(admin/GET)
const getAllUsers = (req, res) => {
    res.status(200).json(dbUsers);
}

//rota user/ (admin/POST)
const createUser = (req, res) => {
    const { username, name, password, userType }  = req.body;
    if(!username || !name || !password || !userType ){
       return res.status(400).json({error: "username, name, password e userType são campos obrigatórios!"});
    }

    const newUser = {id: nextId++, username, name, password, userType };
    dbUsers.push(newUser);
    res.status(201).json(newUser);
}


//api/login/:username(admin/GET)
const getUserByUsername = (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(400).json({ error: "Parâmetro incorreto." });
    }

    const index = dbUsers.findIndex(user => user.username === username);
    if (index === -1) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(dbUsers[index]);
}

//api/login/:username(admin/PUT)
const updateUser = (req, res) => {
    const username = req.params.username;
    const { newUsername, name, password, userType } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Parâmetro incorreto." });
    }

    const index = dbUsers.findIndex(user => user.username === username);
    if (index === -1) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (!newUsername || !name || !password || !userType) {
        return res.status(400).json({ error: "Dados incompletos para atualizar usuário." });
    }

    const userUpdated = { ...dbUsers[index], newUsername, name, password, userType };
    dbUsers[index] = userUpdated;

    res.status(200).json({ message: "Usuário atualizado" });
}

//api/login:username(admin/DELETE)
const deleteUser = (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(400).json({ error: "Parâmetro username obrigatório." });
    }

    const index = dbUsers.findIndex(user => user.username === username);
    if (index === -1) {
        return res.status(404).json({ error: "Usuário não encontrado." })
    }

    dbUsers = dbUsers.filter(user => user.username !== username);
    res.status(200).json({ message: `Usuário com username '${username}' deletado.` });
}


module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser
}