import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get roles metadata set via @Roles() decorator
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // If no roles are set, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the user from the request object (set by JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // If no user is found, deny access
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if the user has one of the required roles
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have the necessary permissions');
    }

    return true;
  }
}
