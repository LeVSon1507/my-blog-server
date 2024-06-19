import { Body } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';

export class BlogService {
  createBlog(@Body() blog: BlogDto): BlogDto {
    blog.createdAt = new Date();
    blog.id = '1';
    blog.updatedAt = new Date();

    return BlogDto.plainToClass(blog);
  }
}
