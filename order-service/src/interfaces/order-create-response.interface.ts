import { IOrder } from './order.interface';

export interface IOrderCreateResponse {
  status: number;
  message: string;
  order: IOrder | null;
  errors: { [key: string]: any } | null;
}
