/* eslint-disable no-unused-vars */
const passport = require('passport');

module.exports = {
  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (err, products, info) => {
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

        if (!products) {
          return res.status(401).json();
        }

        req.token = info.token;
        req.user = products;
        return next();
      },
    )(req, res, next);
  },
};
