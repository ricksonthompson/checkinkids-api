import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePointsChildrensOnCultDTO {
  @IsBoolean()
  @IsOptional()
  verse?: boolean;

  @IsBoolean()
  @IsOptional()
  meditation?: boolean;

  @IsBoolean()
  @IsOptional()
  attendance?: boolean;

  @IsBoolean()
  @IsOptional()
  isInvited?: boolean;
}
