import dotenv from 'dotenv';
import app from './src/app.js';
import db from './src/config/dbConnect.js';
import blacklist from './redis/blacklist.js';

dotenv.config();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});

const port = process.env.ORDER_PORT;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
