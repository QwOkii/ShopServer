import {  Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.model';
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item) private itemRepository : typeof Item){}

  async create(dto: CreateItemDto) {
    const item = await this.itemRepository.create(dto)
    return item
  }

  async findAll() {
    return await this.itemRepository.findAll()
  }
}