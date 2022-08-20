import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IController } from '../interfaces/IController';
import { IService } from '../interfaces/IService';

export default class CarController implements IController<ICar> {
  constructor(private _service: IService<ICar>) {}

  public async create(
    request: Request & { body: ICar },
    response: Response<ICar>,
  ) {
    const resultOfAddingTheCar = await this._service.create(request.body);
    return response.status(201).json(resultOfAddingTheCar);
  }
}