import { IOrder } from './order.interface';

export interface IServiceOrderCreateResponse {
  status: number;
  message: string;
  order: IOrder | null;
  errors: { [key: string]: any };
}
