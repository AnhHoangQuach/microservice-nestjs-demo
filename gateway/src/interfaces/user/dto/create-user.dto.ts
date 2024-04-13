import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test@gmail.com',
  })
  email: string;
  @ApiProperty({
    minLength: 6,
    example: 'test123',
  })
  password: string;
}
