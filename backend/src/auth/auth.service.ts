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
      if (user.password && user.password === payload.password) {
        const { password, ...result } = user;
        return result;
      } else if (user.id  && user.id === payload.id) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    // this "any" somehow allow both data structures to work: {user:{username,password}} and {username,password}
    const data = { username: user.username, password: user.password }; // TODO: have this password hashed
    const userData = await this.validateUser(data);
    if (userData) {
      const payload = {
        username: userData._doc.username,
        id: userData._doc._id.toString(),
      }
      return {
        id: payload.id,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
