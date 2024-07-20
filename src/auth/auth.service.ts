import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  register(body: UserDto) {
    console.log(body);
  }
}
