import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';
import { EUserType } from '../../utils/ETypes';

export class UpdateUserDTO {
  @IsOptional()
  @Length(2, 55)
  name: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsEnum(EUserType)
  @IsOptional()
  type: EUserType;
}
