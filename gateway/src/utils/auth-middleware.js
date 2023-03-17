/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';

const bearer = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    (err, payload, info) => {
      if (err && err.name === 'JsonWebTokenerrr') {
        return res.status(401).json({ err: err.message });
      }

      if (err && err.name === 'TokenExpirederrr') {
        return res
          .status(401)
          .json({ err: err.message, expiradoEm: err.expiredAt });
      }

      if (err) {
        return res.status(500).json({ err: err.message });
      }

      if (!payload) {
        return res.status(401).json();
      }

      req.token = info.token;
      req.user = payload.id;
      return next();
    },
  )(req, res, next);
};

export default bearer;
