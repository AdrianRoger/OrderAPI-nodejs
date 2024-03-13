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

const isValidDecimalFormat = (req, res, next) => {
    const { value } = req.body;

    if(!value){
        return res.json({error:'O atributo value é obrigatório.'});
    }

    if (value === undefined || isNaN(value)) {
        return res.status(400).json({ error: 'O valor deve ser um número.' });
    }

    if (!/^\d+(\.\d{2})$/.test(value)) {
        return res.status(400).json({ error: 'O valor deve ter duas casas decimais.' });
    }

    if (/^\d+(\,\d{2})$/.test(value)) {
        return res.status(400).json({ error: 'A separação das casas decimais deve ser feita com ponto.' });
    }

    next();
}

module.exports = {
    isInteger,
    isValidName,
    isValidDecimalFormat
};
