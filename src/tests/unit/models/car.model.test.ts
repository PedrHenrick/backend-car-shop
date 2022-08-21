import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { objectForAddACar, successfulCreationReturn } from '../../mocks/car.mock';
import CarModel from '../../../models/Car.model';
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
    it('Testando se passa co sucesso', async () => {
      const resultOfAddingTheCar = await carModel.create(objectForAddACar);
      expect(resultOfAddingTheCar).to.be.deep.equal(successfulCreationReturn);
    });
  });
});