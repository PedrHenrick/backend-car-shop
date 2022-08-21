import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.model';
import { objectForAddACar, successfulCreationReturn } from '../../mocks/car.mock';

const { expect } = chai;

describe('Testando camada models da rota /cars', () => {
  const carModel = new CarModel();
  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(successfulCreationReturn);
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
});