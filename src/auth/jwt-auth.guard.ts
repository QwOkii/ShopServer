import { JwtService } from '@nestjs/jwt';
import {CanActivate,ExecutionContext,UnauthorizedException} from '@nestjs/common'
import {Observable} from 'rxjs'
import {Injectable} from '@nestjs/common'

@Injectable()
export class JwtAuthGuadr implements CanActivate{
    constructor(private JwtService :JwtService){}

    canActivate(context :ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.header.authorization
            const bearer = authHeader.split('')[0]
            const token = authHeader.split('')[1]

            if( bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message:'the user is not authorized'})
            }

            const user = this.JwtService.verify(token)
            req.user = user 
            return true
            
        } catch (e) {
            throw new UnauthorizedException({message:'the user is not authorized'})
        }
    }
}