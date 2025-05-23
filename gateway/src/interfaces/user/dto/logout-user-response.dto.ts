import { ApiProperty } from '@nestjs/swagger';

export class LogoutUserResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: null;

  @ApiProperty()
  errors: { [key: string]: any };
}
