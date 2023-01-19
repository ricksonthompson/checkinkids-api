import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Length,
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ResponsiblesDTO } from './responsibles.dto';

export class CreateChildrenDTO {
  @IsNotEmpty()
  @Length(2, 55)
  name: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsOptional()
  observations: string;

  @Type(() => ResponsiblesDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  responsibles: ResponsiblesDTO[];
}
