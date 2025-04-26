import { ApiProperty } from '@nestjs/swagger';

export class ConfirmUserResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: null;

  @ApiProperty()
  errors: { [key: string]: any };
}
