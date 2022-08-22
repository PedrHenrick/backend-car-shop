import { IService } from '../interfaces/IService';
import { ICar, ICarZodShema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../class/error.class';

export default class CarService implements IService<ICar> {
  constructor(private _model: IModel<ICar>) { }

  public async create(carObject: ICar): Promise<ICar> {
    const parsed = ICarZodShema.safeParse(carObject);
    if (!parsed.success) throw parsed.error;
    return this._model.create(carObject);
  }

  public async read(): Promise<ICar[]> { 
    return this._model.read();
  }

  public async readOne(_id: string): Promise<ICar> { 
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(
    _id: string,
    objectUpdate: ICar,
  ): Promise<ICar | null> {
    const parsed = ICarZodShema.safeParse(objectUpdate);
    if (!parsed.success) throw parsed.error;

    await this.readOne(_id);
    return this._model.update(_id, objectUpdate);    
  }
}
