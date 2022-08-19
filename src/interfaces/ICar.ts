import { z } from 'zod';
import { IVehicleZodShema } from './IVehicle';

export const ICarZodShema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
}).merge(IVehicleZodShema);

export type ICar = z.infer<typeof ICarZodShema>;
