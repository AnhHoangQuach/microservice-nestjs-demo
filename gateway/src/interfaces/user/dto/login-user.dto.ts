import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;
  @ApiProperty({ example: 'test123' })
  password: string;
}
