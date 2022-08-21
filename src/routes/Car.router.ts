import { Router } from 'express';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';
import CarController from '../controllers/Car.controller';

const carRouter = Router();

const carModelInstance = new CarModel();
const carServiceInstance = new CarService(carModelInstance);
const carControllerInstance = new CarController(carServiceInstance);

carRouter.post('/', (request, response) => carControllerInstance
  .create(request, response));
carRouter.get('/', (request, response) => carControllerInstance
  .read(request, response));

export default carRouter;