import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty({ message: '[email] O e-mail deve ser preenchido.' })
  email: string;

  @IsString({
    message: '[password] A senha deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: '[password] A senha deve ser preenchida.',
  })
  @MinLength(6, {
    message: '[password] A senha deve possuir no mínimo 6 caracteres.',
  })
  password: string;
}
