// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

const jwtSecret = 'XXXXXX'; // TODO: Get this from .env file

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload); // TODO: this function currently validate a couple username&password, it doesn't actually validate the JWT, substitute it with one that does
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
