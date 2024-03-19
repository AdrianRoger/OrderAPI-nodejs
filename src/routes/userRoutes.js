
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
router.get('/:username', userController.getUserByUsername);

//Atualiza os dados do usuário = ‘:username’
router.put('/:username',  userController.updateUser);

//Apaga os dados do usuário = ‘:username’
router.delete('/:username',  userController.deleteUser);


module.exports = router;