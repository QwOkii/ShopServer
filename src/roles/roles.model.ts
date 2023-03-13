import { ApiProperty } from "@nestjs/swagger/dist";
import { Model,Table,Column,DataType,BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs{
    value:string,
    description:string
}

@Table( {tableName:'roles'})
export class Role extends Model<Role,RoleCreationAttrs>{

    @ApiProperty({example:'1',description:'identifier'})
    @Column({type:DataType.INTEGER,unique:true, autoIncrement:true,primaryKey:true})
    id:number
    
    @ApiProperty({example:' client ',description:'value'})
    @Column({type:DataType.STRING,unique:true, allowNull:false})
    value:string
    
    @ApiProperty({example:'serverShop@email.com',description:'description'})
    @Column({type:DataType.STRING, allowNull:false})
    description:string
    
    @BelongsToMany(() => User,() => UserRoles)
    users:User[]
}