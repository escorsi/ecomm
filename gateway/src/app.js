import express from 'express';
import routes from './routes/index.js';
import './utils/auth.js';
import './utils/auth-middleware.js';

const app = express();
app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    res.status(status).json({ error: message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  next();
});
routes(app);

export default app;
