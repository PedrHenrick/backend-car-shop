import 'express-async-errors';
import express from 'express';
import router from './routes/Router';
import errorHandle from './middlewares/error.middleware';

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandle);

export default app;
