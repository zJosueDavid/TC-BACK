import { IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto{

    @IsString()
    nameUser: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Transform(({value})=> value.trim())//para que no metan espacios
    password: string;
}