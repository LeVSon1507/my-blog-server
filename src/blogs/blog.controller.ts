import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entity';
import { ResponseMessage } from 'src/customDecorator';
import { BlogDto, GetBlogsQueryDto } from './dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ResponseMessage('Blog records fetched successfully')
  getAllBlogs(
    @Query() query: GetBlogsQueryDto,
  ): Promise<{ blogs: Blog[]; totalPages: number }> {
    return this.blogService.getAllBlog(query);
  }

  @Post()
  @ResponseMessage('Blog records created successfully')
  createBlog(@Body() blog: Blog): Promise<BlogDto> {
    blog.createdAt = new Date();
    blog.updatedAt = new Date();

    return this.blogService.createBlog(blog);
  }

  @Get(':id')
  getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.getBlog(id);
  }

  @Put(':id')
  @ResponseMessage('Blog records update successfully')
  updateBlog(@Param('id') id: string, @Body() blog: Blog): Promise<Blog> {
    return this.blogService.updateBlog(id, blog);
  }
}
