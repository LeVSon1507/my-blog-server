import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class LoginDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  @IsString()
  @Length(6, 20)
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
