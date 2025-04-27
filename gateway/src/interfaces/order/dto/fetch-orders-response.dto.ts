import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class FetchOrdersResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  orders: IOrder[];

  @ApiProperty()
  errors: { [key: string]: any };
}
