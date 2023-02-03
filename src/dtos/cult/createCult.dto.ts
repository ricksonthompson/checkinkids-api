import { EShiftCult } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCultDTO {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(EShiftCult)
  @IsNotEmpty()
  shift: EShiftCult;
}
