/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import tokenVerify from '../../redis/blacklistManipulate.js';

async function verifyBlacklistToken(token) {
  const tokenBlacklist = await tokenVerify(token);
  if (tokenBlacklist) throw new jwt.JsonWebTokenError('Logout já realizado com este token!');
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verifyBlacklistToken(token);
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        done(null, payload.id, { token });
      } catch (err) {
        done(err);
      }
    },
  ),
);

export default BearerStrategy;
