import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: {
    token: string;
  };

  @ApiProperty()
  errors: { [key: string]: any };
}
