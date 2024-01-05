import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    try {
      const { username, password } = loginData;

      const checkUser = await this.userService.findByUsername(username);

      if (!checkUser) {
        throw Error('User Does not exists');
      }

      if (bcrypt.compareSync(password, checkUser.hashedPassword)) {
        return {
          access_token: this.jwtService.sign(loginData, {
            secret: process.env.JWT_SECRET,
          }),
        };
      } else {
        throw Error('Invalid password');
      }
    } catch (error) {
      throw Error(error);
    }
  }
}
