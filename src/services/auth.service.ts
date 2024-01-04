import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginData: LoginDto) {
    const { username, password } = loginData;

    const user = await this.userService.findByUsername(username);

    if (user) {
      bcrypt.compare(password, user.hashedPassword, async function (err, res) {
        if (err) {
          throw new UnauthorizedException();
        }

        if (res) {
          const payload = {
            username: user.username,
            password: user.hashedPassword,
          };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        }
      });
    }
  }
}
