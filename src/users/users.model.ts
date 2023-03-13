import { ApiProperty } from "@nestjs/swagger/dist";
import { BelongsToMany } from "sequelize-typescript";
import { Model,Table,Column,DataType } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttrs{
    fullName:string,
    email:string,
    password:string
}

@Table( {tableName:'users'})
export class User extends Model<User,UserCreationAttrs>{

    @ApiProperty({example:'1',description:'identifier'})
    @Column({type:DataType.INTEGER,unique:true, autoIncrement:true,primaryKey:true})
    id:number
    
    @ApiProperty({example:' firstName lastName ',description:'fullName'})
    @Column({type:DataType.STRING, allowNull:false})
    fullName:string
    
    @ApiProperty({example:'serverShop@email.com',description:'email'})
    @Column({type:DataType.STRING,unique:true, allowNull:false})
    email:string
    
    @ApiProperty({example:'qwerty123456',description:'password'})
    @Column({type:DataType.STRING, allowNull:false})
    password:string

    @BelongsToMany(() => Role,() => UserRoles)
    roles:Role[]
}