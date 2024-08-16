import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, isString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto{

    @IsString()
    nameUser: string;
    // @IsEmail()
    // email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Transform(({value})=> value.trim())//para que no metan espacios
    password: string;
}