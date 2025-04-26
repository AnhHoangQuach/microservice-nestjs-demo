import { IProduct } from './product.interface';

export interface IProductSearchResponse {
  status: number;
  message: string;
  product: IProduct | null;
}
