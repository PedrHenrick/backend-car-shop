import { IService } from '../interfaces/IService';
import { ICar, ICarZodShema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) { this._car = model; }

  public async create(carObject: ICar): Promise<ICar> {
    const parsed = ICarZodShema.safeParse(carObject);

    if (!parsed.success) throw parsed.error;
    return this._car.create(carObject);
  }
}
