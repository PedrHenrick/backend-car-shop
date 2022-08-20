import { Router } from 'express';
import carRouter from './Car.router';

const router = Router();

router.use('/cars', carRouter);

export default router;