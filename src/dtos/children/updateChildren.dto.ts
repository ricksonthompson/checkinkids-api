import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from '../address/address.dto';

export class UpdateChildrenDTO {
  @IsOptional()
  @Length(2, 55)
  firstName: string;

  @IsOptional()
  @Length(2, 55)
  lastName: string;

  @IsString()
  @IsOptional()
  birthDate: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  @IsOptional()
  address: AddressDTO;

  @IsNotEmptyObject()
  @IsOptional()
  observations: object;
}
