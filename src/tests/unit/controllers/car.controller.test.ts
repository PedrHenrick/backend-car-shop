import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { objectForAddACar, returnOfAllCars, returnOneCars, successfulCreationReturn } from '../../mocks/car.mock';
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
    sinon
      .stub(carModel, 'read')
      .resolves(returnOfAllCars);
    sinon
      .stub(carModel, 'readOne')
      .resolves(returnOneCars);

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

  describe('Testando se retorna todos os carro', async () => {
    it('Testando se retorna com sucesso', async () => {
      await carController.read(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(returnOfAllCars)).to.be.true;
    });
  });

  describe('Testando se retorna um carro específico', async () => {
    it('Testando se passando um id válido retorna com sucesso', async () => {
      request.params = { id: returnOneCars._id }
      await carController.readOne(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(returnOneCars)).to.be.true;
    });
  });
});