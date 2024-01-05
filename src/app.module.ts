import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user.module';
import { AdminAuthorizationMiddleware } from 'src/middlewares/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from 'src/modules/auth.module';
import { JwtService } from '@nestjs/jwt';
import { GroupModule } from 'src/modules/group.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    AuthenticationModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthorizationMiddleware)
      .forRoutes('users/create', 'users/edit');
  }
}
