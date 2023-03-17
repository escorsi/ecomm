import passport from 'passport';

const local = (req, res, next) => {
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
};

export default local;
