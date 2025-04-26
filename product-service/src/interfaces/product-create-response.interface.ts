import { IProduct } from './product.interface';

export interface IProductCreateResponse {
  status: number;
  message: string;
  product: IProduct | null;
  errors: { [key: string]: any } | null;
}
