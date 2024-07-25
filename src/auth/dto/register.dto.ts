import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsEmail,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'username should not be empty' })
  @Expose()
  @IsString({ message: 'username must be a string' })
  @Length(6, 20, {
    message: 'username must be longer than or equal to 6 characters',
  })
  username: string;

  @Expose()
  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({ message: 'password must be a string' })
  @Length(8, 20, {
    message: 'password must be longer than or equal to 8 characters',
  })
  password: string;

  @IsNotEmpty({ message: 'email should not be empty' })
  @Expose()
  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be an email' })
  email: string;

  @IsString({ message: 'phone must be a string' })
  @Expose()
  @IsOptional()
  phone?: string;

  token?: string;
}
