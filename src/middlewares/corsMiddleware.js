const cors = require('cors');

const corsMiddleware = cors({
    origin: 'same-origin'
});

module.exports = corsMiddleware;

