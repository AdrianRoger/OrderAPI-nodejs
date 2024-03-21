const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {

    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pw, salt);
    }catch(error){
        console.error('Erro ao gerar o hash da senha: ', error);
        return false
    }
}

module.exports = hashPassword;