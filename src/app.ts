import 'express-async-errors';
import express from 'express';
import router from './routes/Router';

const app = express();
app.use(router);

export default app;
