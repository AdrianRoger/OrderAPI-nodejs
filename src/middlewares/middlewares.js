const isInteger = (req, res, next) => {
    const id = req.params.id;

    if(!/^\d+$/.test(id)) {
        return res.json({error: "O id dev ser um número inteiro"});
    }

    next();
}

const isValidName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.json({ error: 'O atributo name é obrigatório.' });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
        return res.json({ error: 'O atributo name deve ter pelo menos 3 caracteres.' });
    }

    next();
};

module.exports = {
    isInteger,
    isValidName
};
