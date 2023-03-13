import { Roles_KEY } from './role-auth.decoratiom';
import { JwtService } from '@nestjs/jwt';
import {CanActivate,ExecutionContext,UnauthorizedException,HttpException,HttpStatus} from '@nestjs/common'
import {Observable} from 'rxjs'
import {Injectable} from '@nestjs/common'
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuadr implements CanActivate{
    constructor(private JwtService :JwtService,
        private reflector:Reflector){}

    canActivate(context :ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiedRoles = this.reflector.getAllAndOverride<string[]>(Roles_KEY,[
                context.getHandler(),
                context.getClass()
            ])
            if(!requiedRoles){
                return true
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.header.authorization
            const bearer = authHeader.split('')[0]
            const token = authHeader.split('')[1]

            if( bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message:'the user is not authorized'})
            }

            const user = this.JwtService.verify(token)
            req.user = user 
            return user.roles.some(role =>requiedRoles.includes(role.value))
            
        } catch (e) {
            throw new HttpException('no access to the service',HttpStatus.FORBIDDEN)
        }
    }
}