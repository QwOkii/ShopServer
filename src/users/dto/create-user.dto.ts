import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({example:' firstName lastName ',description:'fullName'})
    readonly fullName:string

    @ApiProperty({example:'serverShop@email.com',description:'email'})
    readonly email:string

    @ApiProperty({example:'qwerty123456',description:'password'})
    readonly password:string
}

export class CreateUserDtoWithRole extends CreateUserDto{
    readonly role?:string
}