import { Controller,Post,Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
    constructor(private AuthService:AuthService){}
    
    @Post('/login')
    login(@Body() userDto :CreateUserDto){
        return this.AuthService.login(userDto)
    }

    @Post('sign')
    sign(@Body() userDto :CreateUserDto){
        return this.AuthService.sign(userDto)
    }
}
