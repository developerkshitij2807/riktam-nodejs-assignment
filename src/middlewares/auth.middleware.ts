import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminAuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      try {
        await this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
      } catch (error) {
        throw Error('Invalid Authorization Data');
      }

      next();
    } catch (error) {
      throw error;
    }
  }
}
