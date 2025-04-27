import { IOrder } from './order.interface';

export interface IOrderFetchResponse {
  status: number;
  message: string;
  orders: IOrder[];
}
