import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Account from '../models/Account.js';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const account = await Account.findOne({ email });
        if (!account) {
          throw new Error('E-mail ou senha inválidos');
        }
        const passwordVerify = await bcrypt.compare(senha, account.senha);
        if (!passwordVerify) {
          throw new Error('E-mail ou senha inválidos');
        }

        done(null, account);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const account = await Account.findById(payload.id);
        done(null, account, { token });
      } catch (err) {
        done(err);
      }
    },
  ),
);

export { LocalStrategy, BearerStrategy };
