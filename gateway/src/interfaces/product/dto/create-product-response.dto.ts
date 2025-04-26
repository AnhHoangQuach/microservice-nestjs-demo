import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../product.interface';

export class CreateProductResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  product: IProduct;

  @ApiProperty()
  errors: { [key: string]: any };
}
