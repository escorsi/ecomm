/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const passport = require('passport');

module.exports = {
  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (err, payment, info) => {
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

        if (!payment) {
          return res.status(401).json();
        }

        req.token = info.token;
        req.user = payment;
        return next();
      },
    )(req, res, next);
  },
};
