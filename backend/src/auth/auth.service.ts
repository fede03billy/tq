import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<any> {
    const user = await this.usersService.findOne(payload.sub);
    if (user && user.username === payload.username) {
      // TODO: add password hash check
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
