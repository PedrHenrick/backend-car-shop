import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { objectForAddACar, successfulCreationReturn } from '../../mocks/car.mock';

const { expect } = chai;

describe('Testando camada service da rota /cars', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(successfulCreationReturn);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testando se é possível adicionar um novo carro', () => {
    it('Testando se é possível adicionar com sucesso', async () => {
      const resultOfAddingTheCar = await carService.create(objectForAddACar);
      expect(resultOfAddingTheCar).to.be.deep.equal(successfulCreationReturn);
    });

    it('Testando se não é possível adicionar passando dados inválidos', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });
});