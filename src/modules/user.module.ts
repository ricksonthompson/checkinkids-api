import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user/user.repository';
import { UserService } from '../services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
