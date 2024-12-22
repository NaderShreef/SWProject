import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    request.user = user;
    return user;
  }
}