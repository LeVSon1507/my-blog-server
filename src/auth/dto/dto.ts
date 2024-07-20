import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsEmail,
} from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
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

  @IsNotEmpty()
  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Expose()
  @IsOptional()
  phone?: string;
}
