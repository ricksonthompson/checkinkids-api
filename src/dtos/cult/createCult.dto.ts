import { EShiftCult } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ETimeCult } from '../../utils/ETypes';

export class CreateCultDTO {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsEnum(ETimeCult)
  @IsNotEmpty()
  time: ETimeCult;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(EShiftCult)
  @IsNotEmpty()
  shift: EShiftCult;
}
