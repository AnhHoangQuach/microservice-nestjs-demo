import { IOrder } from './order.interface';

export interface IOrderSearchResponse {
  status: number;
  message: string;
  order: IOrder | null;
}
