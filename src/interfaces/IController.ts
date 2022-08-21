import { Request, Response } from 'express';

export interface IController<T> {
  create(
    request: Request & { body: T },
    response: Response<T>): Promise<Response>,
  read(
    request: Request,
    response: Response<T[]>): Promise<Response>,
  readOne(
    request: Request & { params: { id: string } },
    response: Response<T | null>): Promise<Response>,
  update?(
    request: Request,
    response: Response<T | null>): Promise<Response>,
  delete?(
    request: Request,
    response: Response<T | null>): Promise<Response>,
}
