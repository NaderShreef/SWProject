import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard doesn't need to be exported again; it's already defined here
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


