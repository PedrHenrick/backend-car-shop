import { model as mongoCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from '../utils/Mongo.model';

const carsMongooseSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongoCreateModel('Car', carsMongooseSchema)) {
    super(model);
  }
}