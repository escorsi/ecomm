import redis from 'redis';

const blacklist = redis.createClient({
  prefix: 'blacklist:',
  host: 'redis',
});

blacklist.on('connect', () => {
  console.log('Cliente Redis conectado!');
});
blacklist.on('error', (error) => {
  console.log('Erro na conexão do Cliente Redis', error);
});

export default blacklist;
