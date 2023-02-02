import {
  IsNotEmpty,
  Length,
  IsString,
  IsPhoneNumber,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { EUserType } from 'src/utils/ETypes';

export class CreateUserDTO {
  @IsNotEmpty()
  @Length(2, 55)
  name: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(EUserType)
  @IsNotEmpty()
  type: EUserType;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: '[password] A senha deve possuir no mínimo 6 caracteres.',
  })
  password: string;
}
