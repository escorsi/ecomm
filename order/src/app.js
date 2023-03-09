/* eslint-disable no-unused-vars */
import express from 'express';
import routes from './routes/index.js';
import BearerStrategy from './utils/auth.js';

const app = express();
app.use(express.json());
routes(app);

export default app;
