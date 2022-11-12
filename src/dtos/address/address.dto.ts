import { IsOptional, Length, Min } from "class-validator";

export class AddressDTO {

    @Length(2, 88)
    city: string

    @Length(2, 88)
    state: string

    @Length(2, 55)
    @IsOptional()
    street?: string
    
    @Min(0)
    @IsOptional()
    number?: number

    @IsOptional()
    @Length(3, 255)
    complement?: string

    @IsOptional()
    @Length(3, 255)
    name?: string
}
