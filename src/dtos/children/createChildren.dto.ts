import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Length,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';
import { AddressDTO } from '../address/address.dto';
import { ResponsiblesDTO } from './responsibles.dto';

export class CreateChildrenDTO {
  @IsNotEmpty()
  @Length(2, 55)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 55)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  @IsNotEmpty()
  address: AddressDTO;

  @IsString()
  @IsOptional()
  observations: string;

  @Type(() => ResponsiblesDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  responsibles: ResponsiblesDTO[];
}
