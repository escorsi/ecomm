import express from 'express';
import passport from 'passport';
import routes from './routes/index.js';

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
routes(app);

export default app;
