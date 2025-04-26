import { IProduct } from './product.interface';

export interface IProductFetchResponse {
  status: number;
  message: string;
  products: IProduct[];
}
