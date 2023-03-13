import { ApiProperty } from "@nestjs/swagger";
import { Model,Table,Column,DataType } from "sequelize-typescript";

interface ItemCreationAttrs{
    name:string,
    cost:number
}

@Table( {tableName:'items'})
export class Item extends Model<Item,ItemCreationAttrs>{
    
    @ApiProperty({example:'1',description:'identifier'})
    @Column({type:DataType.INTEGER,unique:true, autoIncrement:true,primaryKey:true})
    id:number
    
    @ApiProperty({example:'iuon',description:'name'})
    @Column({type:DataType.STRING, allowNull:false})
    name:string

    @ApiProperty({example:'300',description:'cost'})
    @Column({type:DataType.NUMBER, allowNull:false})
    cost:number
}