const dbUsers = require('../database/dbUsers');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const isLogged = (req, res, next) => {
    const sessionToken = req.cookies.session_id;

    if (!sessionToken) {
        return res.status(401).json({ error: "Token JWT ausente!" });
    }

    jwt.verify(sessionToken, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token JWT inválido!" });
        } else {
            req.user = decoded.user;
            next();
        }
    });
}

const checkAdminPermission = (req, res, next) => {
    const user = req.user;

    //verificação em cascata para evitar erro de runtime caso o campo user_type não exista
    if(!user || !user.user_type || !user.user_type.includes('admin')){
        return res.status(401).json({ error: "Acesso não autorizado! Você não tem permissão de administrador." });
    }

    next();
}

module.exports = {
    isLogged,
    checkAdminPermission
};