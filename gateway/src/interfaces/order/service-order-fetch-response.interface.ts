import { IOrder } from './order.interface';

export interface IServiceOrderFetchResponse {
  status: number;
  message: string;
  orders: IOrder[];
}
