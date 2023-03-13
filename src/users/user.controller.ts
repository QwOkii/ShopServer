import { CreateUserDtoWithRole } from './dto/create-user.dto';
import {Controller,Post,Get,Body,UseGuards} from '@nestjs/common'
import { UserService } from './user.service';
import { ApiResponse,ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';
import { JwtAuthGuadr } from 'src/auth/jwt-auth.guard';
import { AddRoleDto } from './dto/add-role.rto';

@ApiTags('Users')
@Controller('users')
export class UserController{
    constructor(private UserServise:UserService){}

    @ApiOperation({summary:'create user'})
    @ApiResponse({status:200,type:User})
    @Post()
    create(@Body() userDto:CreateUserDtoWithRole){
        return this.UserServise.create(userDto)
    }

    @ApiOperation({summary:'get all users'})
    @ApiResponse({status:200,type:[User]})
    @UseGuards(JwtAuthGuadr)
    @Get()
    getAll(){
        return this.UserServise.GetAll()
    }

}