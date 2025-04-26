import { IProduct } from './product.interface';

export interface IServiceProductCreateResponse {
  status: number;
  message: string;
  product: IProduct | null;
  errors: { [key: string]: any };
}
