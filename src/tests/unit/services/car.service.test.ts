import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { objectForAddACar, returnOfAllCars, returnOneCars, successfulCreationReturn } from '../../mocks/car.mock';

const { expect } = chai;

describe('Testando camada service da rota /cars', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(successfulCreationReturn);
    sinon
      .stub(carModel, 'read')
      .resolves(returnOfAllCars);
    sinon
      .stub(carModel, 'readOne')
      .resolves(returnOneCars);
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

  describe('Testando se retorna todos os carro', async () => {
    it('Testando se retorna com sucesso', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(returnOfAllCars);
    });
  });

  describe('Testando se retorna um carro específico', async () => {
    it('Testando se passando um id válido retorna com sucesso', async () => {
      const car = await carService.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.deep.equal(returnOneCars);
    });
  });
});