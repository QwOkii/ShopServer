import { Controller, Body,Post,Get,UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/role-auth.decoratiom';
import { RoleGuadr } from 'src/auth/roles.guadr';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.model';
import { ItemService } from './item.service';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @ApiOperation({summary:'get all item'})
  @ApiResponse({status:200,type:[Item]})
  @Get()
  get() {
    return this.itemService.findAll();
  }

  @ApiOperation({summary:'create item'})
  @ApiResponse({status:200,type:Item})
  @Roles('admin')
  @UseGuards(RoleGuadr)
  @Post()
  create(@Body() itemDto:CreateItemDto) {
    return this.itemService.create(itemDto);
  }

}

