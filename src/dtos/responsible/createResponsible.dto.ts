import { IsNotEmpty, Length, IsString, IsEnum } from "class-validator";
import { EResponsibleType } from "src/utils/ETypes";

export class CreateResponsibleDTO {
  @IsNotEmpty()
  @Length(2, 55)
  firstName: string

  @IsNotEmpty()
  @Length(2, 55)
  lastName: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string
}