import { ApiProperty } from "@nestjs/swagger"

export class CreateRoleDto {
    @ApiProperty({example:' admin ',description:'role'})
    readonly value:string

    @ApiProperty({example:'admin',description:'description'})
    readonly description:string
}