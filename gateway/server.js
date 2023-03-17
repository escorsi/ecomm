import dotenv from 'dotenv';
import app from './src/app.js';
import blacklist from './redis/blacklist.js';

dotenv.config();

const port = process.env.GATEWAY_PORT;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
