import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';

export class ResponsiblesDTO {
  @IsNotEmpty()
  @Length(2, 55)
  name: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
