import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateResponsibleDTO {
  @IsOptional()
  @Length(2, 55)
  firstName: string;

  @IsOptional()
  @Length(2, 55)
  lastName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;
}
