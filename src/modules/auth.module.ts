import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationController } from 'src/controllers/auth.controller';
import { UserModule } from 'src/modules/user.module';
import { AuthenticationService } from 'src/services/auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService],
})
export class AuthenticationModule {}
