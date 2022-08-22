import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.model';
import { objectForAddACar, returnOfAllCars, returnOneCars, successfulCreationReturn } from '../../mocks/car.mock';

const { expect } = chai;

describe('Testando camada models da rota /cars', () => {
  const carModel = new CarModel();
  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(successfulCreationReturn);
    sinon
      .stub(Model, 'find')
      .resolves(returnOfAllCars);
    sinon
      .stub(Model, 'findOne')
      .resolves(returnOneCars);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testando se é possível adicionar um novo carro', async () => {
    it('Testando se é possível adicionar com sucesso', async () => {
      const resultOfAddingTheCar = await carModel.create(objectForAddACar);
      expect(resultOfAddingTheCar).to.be.deep.equal(successfulCreationReturn);
    });
  });

  describe('Testando se retorna todos os carro', async () => {
    it('Testando se retorna com sucesso', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal(returnOfAllCars);
    });
  });

  describe('Testando se retorna um carro específico', async () => {
    it('Testando se passando um id válido retorna com sucesso', async () => {
      const car = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.deep.equal(returnOneCars);
    });
  });
});