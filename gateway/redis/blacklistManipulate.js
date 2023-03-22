import { promisify } from 'util';
import { createHash } from 'crypto';
import blacklist from './blacklist.js';
import RESULTADO from '../constants/constants.js';

const verifyAsync = promisify(blacklist.exists).bind(blacklist);

const generateTokenHash = (token) => {
  const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex');
  return tokenHash;
};

const isTokenValid = async (token) => {
  const tokenHash = generateTokenHash(token);
  const result = await verifyAsync(tokenHash);
  return result === RESULTADO;
};

export default isTokenValid;
