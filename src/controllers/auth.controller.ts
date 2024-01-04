import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { AuthenticationService } from 'src/services/auth.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    this.authenticationService.login(loginDto);
  }

  @Get('/logout')
  async logout(@Request() req) {
    req.session.destroy();

    return { msg: 'The user session has ended' };
  }
}
