import { IProduct } from './product.interface';

export interface IServiceProductResponse {
  message: string;
  product: IProduct;
  errors: { [key: string]: any };
}
