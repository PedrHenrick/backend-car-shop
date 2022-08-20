import { Request, Response } from 'express';

export interface IController<T> {
  create(request: Request, response: Response<T>): Promise<Response>,
  readOne?(request: Request, response: Response<T>): Promise<Response>,
  read?(request: Request, response: Response<T[]>): Promise<Response>,
  update?(request: Request, response: Response<T>): Promise<Response>,
  delete?(request: Request, response: Response<T>): Promise<Response>,
}
