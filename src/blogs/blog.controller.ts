import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entity';
import { ResponseMessage } from 'src/customDecorator';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ResponseMessage('Blog records fetched Succesfully')
  getAllBlogs() {
    return this.blogService.getAllBlog();
  }

  @Post()
  createBlog(@Body() blog: Blog): Promise<Blog> {
    blog.createdAt = new Date();
    blog.updatedAt = new Date();

    return this.blogService.createBlog(blog);
  }

  @Get(':id')
  getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.getBlog(id);
  }
}
