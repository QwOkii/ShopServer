import { Injectable,HttpException,HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/user.service';
import * as bcryptjs from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private UserService:UserService,
        private JWTService:JwtService){}

    async login(dto:CreateUserDto){
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async sign(dto:CreateUserDto){
        const candidate = await this.UserService.getUserByEmail(dto.email)
        if(candidate){
             throw new HttpException(' user has been registrated with this email',HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcryptjs.hash(dto.password,5)
        const newUser = await this.UserService.create({...dto,password:hashPassword})
        return this.generateToken(newUser)
    }
    private async generateToken(user :User){
        const payload = {fullName:user.fullName,email:user.email,id:user.id,roles:user.roles}
        return{
            token: this.JWTService.sign(payload)
        }
    }

    private async validateUser (dto :CreateUserDto){
        const user = await this.UserService.getUserByEmail(dto.email)
        const passwordEqual = await bcryptjs.compare(user.password,dto.password)
        console.log(user);
        if(user && passwordEqual){
            return user
        }
        throw new UnauthorizedException({message:'password uncorrect or user not found'})
    }

}
