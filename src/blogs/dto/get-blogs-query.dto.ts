import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsEnum,
  Max,
} from 'class-validator';

const ALLOWED_SORT_OPTIONS = ['id', 'title', 'content', 'description'] as const;
const ALLOWED_ORDER_OPTIONS = ['ASC', 'DESC', 'asc', 'desc'] as const;

export class GetBlogsQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number;

  @IsOptional()
  @IsString()
  @IsEnum(ALLOWED_SORT_OPTIONS, {
    message: 'sortBy must be one of: id, title, content, description',
  })
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ALLOWED_ORDER_OPTIONS, {
    message: 'order must be one of: ASC, DESC, asc, desc',
  })
  order?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
