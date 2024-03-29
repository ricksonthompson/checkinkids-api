import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from '../configs/authentication/auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { RequestContextModule } from 'nestjs-request-context';
import { UserModule } from './user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN,
      },
    }),
    RequestContextModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthModule {}
