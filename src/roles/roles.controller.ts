import { Controller,Post,Get,Body,Param } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor( private RoleService:RolesService){}

    @Post()
    create(@Body() dto:CreateRoleDto){
        return this.RoleService.createRole(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value){
        return this.RoleService.getRoleByValue(value)
    }
}
