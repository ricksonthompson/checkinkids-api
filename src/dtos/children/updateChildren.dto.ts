import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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

  @IsNotEmptyObject()
  @IsOptional()
  observations: object;
}
