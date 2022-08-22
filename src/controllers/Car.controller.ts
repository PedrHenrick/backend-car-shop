import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IController } from '../interfaces/IController';
import { IService } from '../interfaces/IService';

export default class CarController implements IController<ICar> {
  constructor(private _service: IService<ICar>) {}

  public async create(
    request: Request & { body: ICar },
    response: Response<ICar>,
  ): Promise<Response> {
    const resultOfAddingTheCar = await this._service.create(request.body);
    return response.status(201).json(resultOfAddingTheCar);
  }

  public async read(
    _request: Request,
    response: Response<ICar[]>,
  ): Promise<Response> {
    const allCars = await this._service.read();
    return response.status(200).json(allCars);
  }

  public async readOne(
    request: Request,
    response: Response<ICar | null>,
  ): Promise<Response> {
    const car = await this._service.readOne(request.params.id);
    return response.status(200).json(car);
  }

  public async update(
    request: Request & { body: ICar },
    response: Response<ICar | null>,
  ): Promise<Response> {
    const car = await this._service.update(request.params.id, request.body);
    return response.status(200).json(car);
  }
}