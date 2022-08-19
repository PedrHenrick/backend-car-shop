import { model as mongoCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './Mongo.model';

const carsMongooseSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
});

export default class Cars extends MongoModel<ICar> {
  constructor(model = mongoCreateModel('Car', carsMongooseSchema)) {
    super(model);
  }
}