import { SequelizeModule } from '@nestjs/sequelize';
import { Module,forwardRef} from '@nestjs/common';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  
  controllers: [UserController],
  providers: [UserService],
  imports:[
    SequelizeModule.forFeature([User,Role,UserRoles]),
    RolesModule,
    forwardRef( ()=>AuthModule)
  ],
  exports:[
    UserService
    
  ]
})
export class UserModule {}
