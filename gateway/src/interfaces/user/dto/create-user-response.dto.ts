import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface';

export class CreateUserResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: {
    user: IUser;
    token: string;
  };

  @ApiProperty()
  errors: { [key: string]: any };
}
