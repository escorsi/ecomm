/* eslint-disable no-unused-vars */
const passport = require('passport');

module.exports = {
  local: (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      (err, account, _info) => {
        if (err && err.name === 'InvalidArgumenterrr') {
          return res.status(401).json({ err: err.message });
        }

        if (err) {
          return res.status(500).json({ err: err.message });
        }

        if (!account) {
          return res.status(401).json();
        }

        req.user = account;
        return next();
      },
    )(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (err, account, info) => {
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

        if (!account) {
          return res.status(401).json();
        }

        req.token = info.token;
        req.user = account;
        return next();
      },
    )(req, res, next);
  },
};
