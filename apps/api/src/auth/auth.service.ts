import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async signup(email: string, name: string, password: string) {
    this.logger.info({ email }, 'Signup request');

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.usersService.create({
      email,
      name,
      passwordHash,
    });

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }

  async signin(email: string, password: string) {
    this.logger.info({ email }, 'Signin request');

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid email or password');

    const accessToken = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
    });

    return { accessToken };
  }
}
