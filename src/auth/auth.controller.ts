import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    this.authService.register(body);
  }

  @Post('/login')
  @UseGuards(AuthGuard)
  login(@Body() user: LoginDto) {
    this.authService.login(user);
  }
}
