import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../product.interface';

export class FetchProductsResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  products: IProduct[];

  @ApiProperty()
  errors: { [key: string]: any };
}
