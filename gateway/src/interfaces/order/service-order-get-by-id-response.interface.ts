import { IOrder } from './order.interface';

export interface IServiceOrderResponse {
  message: string;
  order: IOrder;
  errors: { [key: string]: any };
}
