import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    body: RegisterDto,
  ): Promise<{ access_token: string; message: string }> {
    const hash = await bcrypt.hash(body.password, SALT_OR_ROUNDS);

    const user = this.userRepository.create({
      ...body,
      password: hash,
    });

    await this.userRepository.save(user);

    const payload = { sub: user.id, username: user.username };

    return {
      message: 'User created successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(body: LoginDto): Promise<{ username: string; token: string }> {
    const user = await this.userRepository.findOne({
      where: { username: body.username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong username or password');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      username: user.username,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
