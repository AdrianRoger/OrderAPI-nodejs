
const express = require('express');
const router = express();
const loginController = require('../controllers/loginController');
const { isLogged } = require('../middlewares');

//Recebe ‘username’ e ‘password’ e retorna o cookie de sessão registrado.
router.post('/', loginController.authentication);

//Obtém os dado do usuário que fez a chamada caso tenha uma sessão válida (usuários: ‘admin’ e ‘user’)
router.get('/', isLogged, loginController.getLogin);

//Rota para deslogar da aplicação
router.get('/exit', isLogged, loginController.logOut);

module.exports = router;