const isInteger = (req, res, next) => {
    const id = req.params.id;

    if(!/^\d+$/.test(id)) {
        return res.json({error: "O id dev ser um número inteiro"});
    }

    next();
}

module.exports = isInteger;
