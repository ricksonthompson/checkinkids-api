import { IsNotEmpty, IsString } from 'class-validator';

export class AddChildrensOnCultDTO {
  @IsString({ each: true })
  @IsNotEmpty()
  childrensId: string[];
}
