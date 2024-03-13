const express = require('express');
const app = express();
const PORT = process.env.PROT || 3000;

app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);



app.listen(PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

