import { Router } from 'express';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';
import CarController from '../controllers/Car.controller';

const carRouter = Router();

const carModelInstance = new CarModel();
const carServiceInstance = new CarService(carModelInstance);
const carControllerInstance = new CarController(carServiceInstance);

carRouter.post('/', carControllerInstance.create);

export default carRouter;