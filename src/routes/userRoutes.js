
const express = require('express');
const router = express();
const userController = require('../controllers/userController');
const { checkAdminPermission } = require('../middlewares');


router.use(checkAdminPermission);
//Obtém os dados de todos os logins
router.get('/all',  userController.getAllUsers);

//recebe dados de um novo usuário no corpo na requisição e retorna usuário criado
router.post('/', userController.createUser);

//Obtém os dados de login do usuário com username = ‘:username’ 
router.get('/:id', userController.getUserById);

//Atualiza os dados do usuário = ‘:id’
router.put('/:id',  userController.updateUser);

//Apaga os dados do usuário = ‘:id’
router.delete('/:id',  userController.deleteUser);


module.exports = router;