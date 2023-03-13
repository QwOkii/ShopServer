import { CreateUserDtoWithRole } from './dto/create-user.dto';
import { Injectable} from '@nestjs/common';
import { User } from './users.model';
import {InjectModel} from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository : typeof User ,private RoleService:RolesService){}
  
  async create(dto: CreateUserDtoWithRole) {
    const user = await this.userRepository.create({email:dto.email,fullName:dto.fullName,password:dto.password})
    const role = await this.RoleService.getRoleByValue(dto.role)
    await user.$set('roles',[role.id])
    user.roles =[role]
    return user
  }

  async GetAll() {
    const users = await this.userRepository.findAll({where:{},include:{all:true}})
    return users
  }

  async getUserByEmail(email:string){
    const user = await this.userRepository.findOne({where:{email},include:{all:true}})
    return user
  }
}