import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly congifService: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { req } = ctx;
    const token = req.headers.authorization;
    if (token) {
      try {
        const decoded = await this.jwtService.verify(token.replace('Bearer ', ''), {
          secret: this.congifService.get('JWT_SECRET')
        });
        if (decoded) {
          req.user = true;
          return true;
        }
      } catch (err) {
        req.user = false;
        return true;
      }
    }
    req.user = false;
    return true;
  }
}
