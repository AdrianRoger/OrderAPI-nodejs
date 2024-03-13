const express = require('express');
const { corsMiddleware } = require('./middlewares');
const PORT = process.env.PROT || 3000;

const app = express();
app.use(express.json());
app.use(corsMiddleware);
// app.use(express.static('src/public'));

const routes = require('./routes');
app.use('/api', routes);


app.listen(PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

