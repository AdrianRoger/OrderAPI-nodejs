const express = require('express');
const { corsMiddleware, isLogged } = require('./middlewares');

const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

const loginPage = require('./pages/login');
app.get('/', loginPage);

const appPage = require('./pages/app');
app.get('/app', isLogged, appPage);

const routes = require('./routes');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

