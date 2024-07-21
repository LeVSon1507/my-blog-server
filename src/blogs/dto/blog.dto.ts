import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class BlogDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  @Expose()
  @IsString()
  content: string;

  @IsString()
  @Expose()
  @IsOptional()
  description?: string;

  @IsString()
  @Expose()
  @Transform(({ obj }) => obj.content + '' + obj.description)
  @IsOptional()
  body?: string;
}
