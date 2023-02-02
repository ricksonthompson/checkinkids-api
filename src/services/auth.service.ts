import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { fromUnixTime, isAfter } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { setPermissions } from '../utils/roles.permissions';
import { ERoles } from '../utils/ETypes';
import { UserService } from './user.service';
import { UserLoginDTO } from '../dtos/user/userLogin.dto';
import { LoggedUserDTO } from '../dtos/user/loggedUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private verifyToken(token: string): any {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      });

      return decodedToken;
    } catch (e) {
      throw new HttpException('Token inválido!', HttpStatus.UNAUTHORIZED);
    }
  }

  async authenticate(token: string): Promise<boolean> {
    if (!token)
      throw new HttpException('Token não provido!', HttpStatus.UNAUTHORIZED);

    const tokenExtracted = this.extractToken(token);

    const decodedToken = this.verifyToken(tokenExtracted);

    const tokenExpirationIsAfterNow = isAfter(
      fromUnixTime(decodedToken.exp),
      new Date(),
    );

    if (!tokenExpirationIsAfterNow)
      throw new HttpException('Token está expirado', HttpStatus.UNAUTHORIZED);

    return;
  }

  private generateToken(_expireToken: number, employee: any) {
    const token = this.jwtService.sign(
      { sub: employee, permissions: setPermissions(employee.role) },
      {
        expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN,
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      },
    );

    return token;
  }

  async generateTokenData(data: any) {
    return this.generateToken(0, data);
  }

  private extractToken(tokenToExtract: string): string {
    const [, token] = tokenToExtract.split('Bearer ');
    return token;
  }

  async userLogin(data: UserLoginDTO): Promise<LoggedUserDTO> {
    const user = await this.userService.listByEmail(data.email);

    const isValidPassword = bcrypt.compareSync(data.password, user.password);

    if (!isValidPassword)
      throw new HttpException(
        'Credenciais inválidas!',
        HttpStatus.UNAUTHORIZED,
      );

    const token = this.generateToken(1 * 1000 * 60 * 60, {
      id: user.id,
      role: ERoles.ROLE_LEADER,
    });

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      type: user.type,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    };
  }

  async decodeJWT(token: string): Promise<any> {
    const tokenExtracted = this.extractToken(token);

    if (!tokenExtracted)
      throw new HttpException('Token não provido', HttpStatus.UNAUTHORIZED);

    const decodedToken = await this.jwtService.decode(tokenExtracted);

    return decodedToken;
  }
}
