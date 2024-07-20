import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dto';
import { Repository } from 'typeorm';
import { Blog } from './entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async createBlog(blog: BlogDto): Promise<BlogDto> {
    const newBlog = this.blogRepository.create(blog);
    await this.blogRepository.save(newBlog);

    return newBlog;
  }

  async getAllBlog(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async getBlog(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ${id} not found!`);
    }

    return blog;
  }
}
