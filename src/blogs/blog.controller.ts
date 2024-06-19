import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  // constructor(private moduleRef: ModuleRef) {}
  constructor(
    @Inject('BLOG_SERVICE_MY_BLOG') private readonly blogService: BlogService,
  ) {}

  @Get()
  getAllBlogs() {
    return [
      {
        id: '1',
        title: 'title test',
        image: 'image test',
        content: 'content test',
        description: 'description test',
        body: 'body test',
      },
      {
        id: '2',
        title: 'title test',
        image: 'image test',
        content: 'content test',
        description: 'description test',
        body: 'body test',
      },
    ];
  }

  @Post()
  createBlog(@Body() blog: BlogDto): BlogDto {
    // TODO: note using ref way
    // const blogService = this.moduleRef.get('BLOG_SERVICE_MY_BLOG');
    return this.blogService.createBlog(blog);
  }

  @Get(':id')
  getBlogById(@Param('id') id: number) {
    return id;
  }
}
