import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  total_amount: number;

  @ApiProperty()
  shipping_address: string;

  @ApiProperty()
  billing_address: string;
}
