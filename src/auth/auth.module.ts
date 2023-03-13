import { Module,forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ItemModule } from 'src/Items/item.module';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    forwardRef( ()=>UserModule),
    forwardRef( ()=>ItemModule),
    JwtModule.register({
      secret:'SECRET',
      signOptions:{
        expiresIn:'14d'
      }
    })
  ],
  exports:[
    AuthService,JwtModule 
  ]
})
export class AuthModule {}
