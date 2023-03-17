const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes/index.js');

dotenv.config();

const app = express();
const port = process.env.FINANCE_PORT;

routes(app);

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));

module.exports = app;
