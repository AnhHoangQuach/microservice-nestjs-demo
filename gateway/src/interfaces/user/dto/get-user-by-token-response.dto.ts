import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface';

export class GetUserByTokenResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: {
    user: IUser;
  };

  @ApiProperty()
  errors: { [key: string]: any };
}
