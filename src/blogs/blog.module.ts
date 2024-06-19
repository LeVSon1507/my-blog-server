import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [
    {
      provide: 'BLOG_SERVICE_MY_BLOG',
      useClass: BlogService,
    },
  ],
})
export class BlogModule {}
