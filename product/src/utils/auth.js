/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        done(null, payload.id, { token });
      } catch (err) {
        done(err);
      }
    },
  ),
);

export default BearerStrategy;
