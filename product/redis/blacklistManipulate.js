import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { createHash } from 'crypto';
import blacklist from './blacklist.js';

const verifyAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const generateTokenHash = (token) => {
  const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex');
  return tokenHash;
};

const addToken = async (token) => {
  const expirationDate = jwt.decode(token).exp;
  const tokenHash = generateTokenHash(token);
  await setAsync(tokenHash, '');
  blacklist.expireat(tokenHash, expirationDate);
};

const isTokenValid = async (token) => {
  const tokenHash = generateTokenHash(token);
  const result = await verifyAsync(tokenHash);
  return result === 1;
};

export { addToken, isTokenValid };
