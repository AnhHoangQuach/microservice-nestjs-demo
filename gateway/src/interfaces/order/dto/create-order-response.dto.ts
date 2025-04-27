import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class CreateOrderResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  order: IOrder;

  @ApiProperty()
  errors: { [key: string]: any };
}
