import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class GetOrderResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  order: IOrder;

  @ApiProperty()
  errors: { [key: string]: any };
}
