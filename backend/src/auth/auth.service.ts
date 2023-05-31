import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<any> {
    const user = await this.usersService.findOneByUsername(payload.username);
    if (user && user.username === payload.username) {
      // TODO: add password hash check
      if (user.password === payload.password) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    // this "any" somehow allow both data structures to work: {user:{username,password}} and {username,password}
    const payload = { username: user.username, password: user.password }; // TODO: have this password hashed
    const userData = await this.validateUser(payload);
    if (userData) {
      const data = {
        username: userData._doc.username,
        id: userData._doc._id,
      }
      return {
        id: data.id,
        access_token: this.jwtService.sign(data),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
