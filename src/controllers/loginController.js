const hashPassword = require('../Utils/hashPassword');
const comparePassword = require('../Utils/comparePassword');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const createAdminUser = async () =>{
    const username = 'adrianr';
    const name = 'Adrian Roger';
    const password = await hashPassword('123456');
    const userType = [ 'admin', 'user'];
    return { username, name, password, userType };
}
const createCommonUser = async () =>{
    const username = 'roger';
    const name = 'Adrian Roger II';
    const password = await hashPassword('123456');
    const userType = [ 'user' ];
    return { username, name, password, userType };
}

const createLoginUsers = async () => {
    const admin = await createAdminUser();
    const common = await createCommonUser();
    return [ admin, common ];
}

//api/login(todos sem sessão/POST)
const authentication = async (req, res) => {
    const loginUsers = await createLoginUsers();

    const { username, password } = req.body;

    const error = "Usuário e/ou senha inválidos!"
    if (!username || !password) {
        res.cookie('session_id', '', { expires: new Date(0) });
        return res.status(401).json({ error });
    }

    const foundUser = loginUsers.find(user => user.username === username);
    if (!foundUser) {
        res.cookie('session_id', '', { expires: new Date(0) });
        return res.status(401).json({ error });
    }

    const match = await comparePassword(password, foundUser.password);
    console.log('pw:', password, '->hashed: ', foundUser.password);
    if(!match){
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
        res.status(200).json({ success: true });
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