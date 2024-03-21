const bcrypt = require('bcrypt');

const comparePassword = async (pw, hashedPw) => {
    try{
        return await bcrypt.compare(pw, hashedPw);
    }catch(error){
        console.error('Erro ao comparar as senhas: ', error);
        return false;
    }
}

module.exports = comparePassword;