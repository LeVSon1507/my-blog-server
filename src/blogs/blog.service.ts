import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { BlogDto, GetBlogsQueryDto } from './dto';
import { Like, Repository } from 'typeorm';
import { Blog } from './entity';
import { InjectRepository } from '@nestjs/typeorm';

export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async createBlog(blog: BlogDto): Promise<BlogDto> {
    const newBlog = this.blogRepository.create(blog);
    await this.blogRepository.save(newBlog);

    return { ...newBlog, createdAt: new Date(), updatedAt: null };
  }

  async getAllBlog(
    query: GetBlogsQueryDto,
  ): Promise<{ blogs: Blog[]; totalPages: number }> {
    const {
      page = 1,
      limit = 6,
      sortBy = 'id',
      order = 'ASC',
      search = '',
    } = query;

    if (page < 1) {
      throw new HttpException(
        'Page must be greater than or equal to 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    const offset = (page - 1) * limit;

    const [blogs, totalCount] = await this.blogRepository.findAndCount({
      where: search
        ? [
            { title: Like(`%${search}%`) },
            { content: Like(`%${search}%`) },
            { description: Like(`%${search}%`) },
          ]
        : {},
      order: {
        [sortBy]: order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      },
      take: limit,
      skip: offset,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      blogs,
      totalPages,
    };
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

  async updateBlog(id: string, blogContent: Partial<Blog>): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ${id} not found!`);
    }

    const updatedBlog = {
      ...blog,
      ...blogContent,
      updatedAt: new Date(),
    };

    await this.blogRepository.save(updatedBlog);

    return updatedBlog;
  }
}
