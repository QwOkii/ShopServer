import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './users/user.module';
import { ItemModule } from './Items/item.module';
import { Role } from './roles/roles.model';
import { Item } from './Items/item.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  
  controllers: [],
  providers: [],
  imports:[
    SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'Shop',
        models: [User,Role,Item,UserRoles],
        autoLoadModels:true 
    }),
    RolesModule,UserModule,ItemModule, AuthModule
  ],
  
})
export class AppModule {}
