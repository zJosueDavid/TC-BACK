import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import {serialize} from 'cookie';
 
@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

    async register(newRegister: RegisterDto){
        const user = await this.userService.findOneByUser(newRegister.nameUser);

        if(user){
            throw new BadRequestException('User alredy exist');
        }
        newRegister.password = await bcrypt.hash(newRegister.password, 10); 
        return await this.userService.create(newRegister); 
    }

    async login(loginDto: LoginDto){
        const user = await this.userService.findOneByUser(loginDto.nameUser);
        if(!user){
            throw new UnauthorizedException('Email or password is wrong');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('password is wrong');
        }
        const payload = {nameUser: user.nameUser};
        const token = await this.jwtService.signAsync(payload);
        return {token, user};
    }

}
