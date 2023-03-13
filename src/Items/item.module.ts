import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { ItemController } from './item.controller';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Module({
  imports:[
    SequelizeModule.forFeature([Item,Role,UserRoles]),
    RolesModule,
    forwardRef( ()=>AuthModule)
  ],
  controllers: [ItemController],
  providers: [ItemService],
  
})
export class ItemModule {}
