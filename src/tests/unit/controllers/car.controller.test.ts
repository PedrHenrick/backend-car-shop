import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { objectForAddACar, successfulCreationReturn } from '../../mocks/car.mock';
import CarController from '../../../controllers/Car.controller';
import { Request, Response } from 'express';

const { expect } = chai;

describe('Testando camada controller da rota /cars', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const request = {} as Request; 
  const response = {} as Response;

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(successfulCreationReturn);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testando se é possível adicionar um novo carro', () => {
    it('Testando se é possível adicionar com sucesso', async () => {
      request.body = objectForAddACar;
      await carController.create(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(successfulCreationReturn)).to.be.true;
    });
  });
});