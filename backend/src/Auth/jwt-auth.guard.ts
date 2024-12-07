import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Run the default AuthGuard logic first
    const isAuthenticated = super.canActivate(context);
    if (!isAuthenticated) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Add custom role validation logic (optional)
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!roles.includes(user.role)) {
        throw new UnauthorizedException('User does not have required roles');
      }
    }

    return true;
  }
}
