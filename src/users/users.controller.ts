import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private services: UsersService) { }

  @Get()
  async findAll() {
    return await this.services.findAll();
  }

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.services.createOne(userData);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.services.getOne(id);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    return await this.services.removeOne(id);
  }
}
