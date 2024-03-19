let dbUsers = require('../database/dbUsers');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

//api/login(todos sem sessão/POST)
const authentication = async (req, res) => {
    const { username, password } = req.body;

    const error = "Usuário e/ou senha inválidos!"
    if (!username || !password) {
        res.cookie('session_id', '', { expires: new Date(0) });
        return res.status(401).json({ error });
    }

    const foundUser = dbUsers.find(user => user.username === username && user.password === password);
    if (!foundUser) {
        res.cookie('session_id', '', { expires: new Date(0) });
        return res.status(401).json({ error });
    }

    const user = {
        username: foundUser.username,
        name: foundUser.name,
        user_type: foundUser.userType
    };

    try {
        const sessionToken = await jwt.sign({ user }, SECRET_KEY );
        res.cookie('session_id', sessionToken, { maxAge: 900000, httpOnly: true });
        res.status(200).json({ sucess: true });
    } catch (err) {
        res.status(500).json({ error: "Erro ao gerar token JWT." });
    }
}

const logOut = (req, res) =>{
    res.cookie('session_id', '', { expires: new Date(0) });
    return res.status(200).json({ message : "Você saiu do sistema!" });
}

const getLogin = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}

module.exports = {
    getLogin,
    logOut,
    authentication
}