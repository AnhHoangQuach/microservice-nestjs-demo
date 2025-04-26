import { IProduct } from './product.interface';

export interface IServiceProductFetchResponse {
  status: number;
  message: string;
  products: IProduct[];
}
