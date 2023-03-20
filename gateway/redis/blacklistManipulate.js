/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { createHash } from 'crypto';
import blacklist from './blacklist.js';

const verifyAsync = promisify(blacklist.exists).bind(blacklist);

const generateTokenHash = (token) => {
  const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex');
  return tokenHash;
};

const tokenVerify = async (token) => {
  const tokenHash = generateTokenHash(token);
  const result = await verifyAsync(tokenHash);
  return result === 1;
};

export default tokenVerify;
