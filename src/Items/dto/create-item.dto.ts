import { ApiProperty } from "@nestjs/swagger"

export class CreateItemDto {
    @ApiProperty({example:'iuon',description:'name'})
    readonly name:string

    @ApiProperty({example:'300',description:'cost'})
    readonly cost:number
}