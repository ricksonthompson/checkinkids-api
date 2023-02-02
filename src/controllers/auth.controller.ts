import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserLoginDTO } from '../dtos/user/userLogin.dto';
import { Public } from '../decorators/public.decorator';
import { AuthService } from '../services/auth.service';
import { LoggedUserDTO } from 'src/dtos/user/loggedUser.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async employeeAuth(@Body() payload: UserLoginDTO): Promise<LoggedUserDTO> {
    return await this.authService.userLogin(payload);
  }
}
