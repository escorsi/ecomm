/* eslint-disable no-unused-vars */
import express from 'express';
import routes from './routes/index.js';
import { LocalStrategy, BearerStrategy } from './utils/auth.js';

const app = express();
app.use(express.json());
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
